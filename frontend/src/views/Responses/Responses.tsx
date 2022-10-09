import Button from "@/components/Button/Button";
import DropdownMenu from "@/components/DropdownMenu/DropdownMenu";
import { useEffect, useMemo, useRef, useState } from "react";
import RequestCard from "./RequestCard";

const Responses = ({ tokens }: any) => {
  const [selectedForm, setSelectedForm] = useState<number | undefined>();

  useEffect(() => {
    const fetch = async () => {
      if (tokens?.length) {
        selectForm(0);
      }
    };
    fetch();
  }, [tokens]);

  const responses = [
    {
      answer: {
        formId: 1,
        formAnswers: [
          {
            value: "sefafeafw",
            referenceId: "question-0",
          },
        ],
      },
      address: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
      ownedCredentials: [
        {
          contractAddress: "0xb876baf8f69cd35fb96a17a599b070fbdd18a6a1",
          tokenId: "796",
        },
      ],
    },
  ];

  const forms = [
    {
      form: {
        fields: [
          {
            type: "shortText",
            title: "waawef",
            required: true,
            referenceId: "question-0",
          },
        ],
      },
      accessControlTokens: [
        {
          contractAddress: "0x4826533B4897376654Bb4d4AD88B7faFD0C98528",
          tokenId: 1,
        },
      ],
      credentials: [
        {
          contractAddress: "0x4826533B4897376654Bb4d4AD88B7faFD0C98528",
          tokenId: 1,
        },
      ],
    },
    {
      form: {
        fields: [
          {
            type: "shortText",
            title: "waawef",
            required: true,
            referenceId: "question-0",
          },
        ],
      },
      accessControlTokens: [
        {
          contractAddress: "0x4826533B4897376654Bb4d4AD88B7faFD0C98528",
          tokenId: 1,
        },
      ],
      credentials: [
        {
          contractAddress: "0x4826533B4897376654Bb4d4AD88B7faFD0C98528",
          tokenId: 1,
        },
      ],
    },
  ];

  const selectForm = async (tokenId: number) => {
    setSelectedForm(tokenId);
    // const response = await getRequestsForToken({
    //   tokenId,
    //   statusType: "pending",
    // });
    // const templateResponse = await getRequestTemplates({ tokenId });
    // setTemplate(templateResponse?.data[0]);
    // setChecklist(
    //   response?.data?.map((request: any) => {
    //     return {
    //       ...request,
    //       templateAnswers: request?.templateAnswers?.map((answer: any) => {
    //         const questionForAnswer = templateResponse?.data[0]?.fields?.find(
    //           (field: any) => field.referenceId === answer.referenceId
    //         )?.title;
    //         return {
    //           ...answer,
    //           question: questionForAnswer,
    //         };
    //       }),
    //       checked: false,
    //     };
    //   })
    // );
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
          items={forms?.map((form: any, index: number) => {
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
