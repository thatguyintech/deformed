import { getFormAnswers, getFormsCreatedByAddress } from "@/api/forms";
import Button from "@/components/Button/Button";
import DropdownMenu from "@/components/DropdownMenu/DropdownMenu";
import { PageLoader } from "@/components/PageLoader/PageLoader";
import { useWeb3Auth } from "@/hooks/useWeb3Auth";
import { useEffect, useMemo, useRef, useState } from "react";
import RequestCard from "./RequestCard";

const Responses = () => {
  const [selectedForm, setSelectedForm] = useState<number | undefined>();
  const [selectedFields, setSelectedFields] = useState<number | undefined>();

  const [createdForms, setCreatedForms] = useState<any[]>([]);
  const [responses, setResponses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const { web3authProvider, address } = useWeb3Auth();

  useEffect(() => {
    const fetch = async () => {
      if (address) {
        try {
          setLoading(true);
          const formsResponse = await getFormsCreatedByAddress(address);
          setCreatedForms(formsResponse.data);
          selectForm(formsResponse.data[0]);
          setLoading(false);
        } catch (error) {
          setLoading(false);
        }
      }
    };
    fetch();
  }, [address]);

  const selectForm = async (formData: any) => {
    try {
      const formId = formData?.formId;
      setSelectedForm(formId);
      setSelectedFields(formData?.form?.fields);
      if (formId) {
        const answersResponse = await getFormAnswers(formData?.formId);
        setResponses(answersResponse.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const requestCards = useMemo(() => {
    return responses?.map((response: any, index: number) => {
      return (
        <div className="flex items-center" key={"response" + index}>
          <RequestCard
            answers={response.answers}
            address={response.address}
            fields={selectedFields}
          />
        </div>
      );
    });
  }, [responses]);

  return (
    <>
      {loading ? (
        <PageLoader />
      ) : (
        <>
          <h1 className="text-center text-xl font-semibold">Responses</h1>
          <div className="flex items-center mb-6 mt-8 justify-end ">
            <DropdownMenu
              items={createdForms?.map((form: any, index: number) => {
                return {
                  id: form.formId,
                  label: `Form ${form.formId}`,
                  iconUrl: "",
                  onClick: async () => {
                    await selectForm(form);
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
      )}
    </>
  );
};

export default Responses;
