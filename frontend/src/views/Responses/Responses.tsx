import { getFormAnswers, getFormsCreatedByAddress } from "@/api/forms";
import Button from "@/components/Button/Button";
import DropdownMenu from "@/components/DropdownMenu/DropdownMenu";
import { useWeb3Auth } from "@/hooks/useWeb3Auth";
import { useEffect, useMemo, useRef, useState } from "react";
import RequestCard from "./RequestCard";

const Responses = () => {
  const [selectedForm, setSelectedForm] = useState<number | undefined>();
  const [createdForms, setCreatedForms] = useState<any[]>([]);
  const [responses, setResponses] = useState<any[]>([]);

  const { web3authProvider, address } = useWeb3Auth();

  useEffect(() => {
    const fetch = async () => {
      if (web3authProvider && address) {
        const formsResponse = await getFormsCreatedByAddress(address);
        setCreatedForms(formsResponse.data);
        selectForm(formsResponse.data[0].formId);
      }
    };
    fetch();
  }, [address, web3authProvider]);

  useEffect(() => {
    const fetchAnswers = async () => {};
    fetchAnswers();
  }, [selectedForm]);

  const selectForm = async (formId: number) => {
    setSelectedForm(formId);
    if (formId) {
      const answersResponse = await getFormAnswers(selectedForm as number);
      setResponses(answersResponse.data);
    }
  };

  const requestCards = useMemo(() => {
    return responses?.map((response: any, index: number) => {
      return (
        <div className="flex items-center" key={"response" + index}>
          <RequestCard answer={response.answer} address={response.address} />
        </div>
      );
    });
  }, [responses]);

  return (
    <>
      <h1 className="text-center text-xl font-semibold">Responses</h1>
      <div className="flex items-center mb-6 mt-8 justify-end ">
        <DropdownMenu
          items={createdForms?.map((form: any, index: number) => {
            return {
              id: index,
              label: `Form ${index}`,
              iconUrl: "",
              onClick: async () => {
                await selectForm(index);
              },
            };
          })}
        />
      </div>
      {responses.length > 0 ? (
        <div className="flex-col flex gap-y-4">{requestCards}</div>
      ) : (
        <>
          <div className="text-center mt-14">No responses</div>
        </>
      )}
    </>
  );
};

export default Responses;
