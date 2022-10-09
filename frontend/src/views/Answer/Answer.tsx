import { createAnswer, getForm } from "@/api/forms";
import Card from "@/components/Card/Card";
import { Main } from "@/templates/Main";
import { useEffect, useState } from "react";
import AnswerForm from "./AnswerForm";


export type CredentialNFT = {
  contractAddress: string;
  tokenId: string;
  imageUrl: string;
  name: string;
  description: string;
}

const Answer = ({ formId }: any) => {
  const [formFields, setFormFields] = useState<any[]>([]);
  const submitAnswer = async (rawFormAnswerDict: any) => {
    /**
     * The form answers will come in the following format:
     * {
     *  question-0: '1asdf'
     * }
     * 
     * We need the API POST body to be in this format instead:
     * [
     *  {
     *    "referenceId": "question-0",
     *    "value": "1asdf"
     *  }
     * ]
     */
    try {
      const createAnswerFormAnswers: any[]= [];
      const keys = Object.keys(rawFormAnswerDict);
      keys.forEach((key) => {
        const answer = rawFormAnswerDict[key];
        createAnswerFormAnswers.push(
          {
            "referenceId": key,
            "value": answer,
          }
        )
      })
      await createAnswer({
        formId: formId,
        formAnswers: createAnswerFormAnswers,
      });
    } catch (error: any) {
      console.log(error);
    }
  };


  // obtain the form config from the backend API to populate the form itself
  useEffect(() => {
    const obtainForm = async () => {
      if (formId) {
        const form = await getForm(formId);
        setFormFields(form.fields);
      }
    };
    obtainForm();
  }, [formId]);


  const TMP_LIST_OF_CREDENTIALS: CredentialNFT[] = [
    {
      contractAddress: "0xB876baF8F69cD35fb96A17a599b070FBdD18A6a1",
      tokenId: "797",
      imageUrl: "https://s3.amazonaws.com/sandbox.images.mintkudos.xyz/token/797.jpeg",
      name: "Proof of Trek: Monserrate",
      description: "We certify that you sprinted up Monserrate in under 30 minutes. You are a beast!",
    },
    {
      contractAddress: "0xB876baF8F69cD35fb96A17a599b070FBdD18A6a1",
      tokenId: "796",
      imageUrl: "https://s3.amazonaws.com/sandbox.images.mintkudos.xyz/token/796.png",
      name: "ETH Bogota Attendance!",
      description: "You participated in the ETH Bogota Hackathon! Nice job!",
    }
  ];

  return (
    <>
      <Main>
        <Card className="rounded py-10 px-12 bg-white flex-col shadow-md">
          {/* <h2 className="text-center">Answer Form</h2> */}

          <AnswerForm
            className="w-full mb-5"
            fields={formFields}
            credentials={TMP_LIST_OF_CREDENTIALS}
            onSubmit={submitAnswer}
          />
        </Card>
      </Main>
    </>
  );
};

export default Answer;
