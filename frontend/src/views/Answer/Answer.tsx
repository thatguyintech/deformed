import { createAnswer, getForm } from "@/api/forms";
import Card from "@/components/Card/Card";
import { Main } from "@/templates/Main";
import { useEffect, useState } from "react";
import AnswerForm from "./AnswerForm";
import { useWeb3Auth } from "../../hooks/useWeb3Auth";
import { checkOwner } from "../../api/nfts";
import { ethers } from "ethers";
import { Deformed__factory } from "@deformed/contracts";

interface Token {
  contractAddress: string;
  tokenId: string;
}

export type CredentialNFT = {
  contractAddress: string;
  tokenId: string;
  imageUrl: string;
  name: string;
  description: string;
};

const Answer = ({ formId }: any) => {
  const { address } = useWeb3Auth();
  const [formFields, setFormFields] = useState<any[]>([]);
  const [hasAccess, setHasAccess] = useState<boolean>(false);

  const { web3authProvider } = useWeb3Auth();

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
      const createAnswerFormAnswers: any[] = [];
      const keys = Object.keys(rawFormAnswerDict);
      keys.forEach((key) => {
        const answer = rawFormAnswerDict[key];
        createAnswerFormAnswers.push({
          referenceId: key,
          value: answer,
        });
      });
      const response = await createAnswer({
        formId: formId,
        formAnswers: createAnswerFormAnswers,
      });
      const provider = new ethers.providers.Web3Provider(web3authProvider);
      const deformed = Deformed__factory.connect(
        "0xfFAfd3b46D3034bB3f12868c92DCA375E7263C38",
        provider.getSigner()
      );
      await deformed.submitFormResponse(formId, response.hash);
    } catch (error: any) {
      console.log(error);
    }
  };

  // returns true if the loggedInAddress owns *all* of the requiredTokens
  const checkAccessTokens = async (
    requiredTokens: Array<Token>,
    loggedInAddress: string
  ) => {
    console.log("loggedInAddress: ", loggedInAddress);
    console.log("checking access tokens");
    for (const token of requiredTokens) {
      const contractAddress = token.contractAddress;
      const tokenId = token.tokenId;
      // fetch owners of each token
      const owners = await checkOwner(contractAddress, tokenId);
      console.log("owners: ", owners);
      // check if logged in user owns the token, short-circuit if they don't own one
      if (!owners.includes(loggedInAddress.toLowerCase())) {
        console.log("token not owned");
        return false;
      }
    }
    console.log("all tokens owned");
    // return true if all tokens are owned by logged in user
    return true;
  };

  // obtain the form config from the backend API to populate the form itself
  useEffect(() => {
    const obtainForm = async () => {
      if (formId) {
        const form = await getForm(formId);
        setFormFields(form.form.fields);
        setHasAccess(
          await checkAccessTokens(form.accessControlTokens, address)
        );
      }
    };
    obtainForm();
  }, [formId]);

  return (
    <>
      <Main>
        {!hasAccess ? (
          <Card className="rounded py-10 px-12 bg-white flex-col shadow-md">
            <div>You do not have access to all of the required tokens!</div>
          </Card>
        ) : (
          <Card className="rounded py-10 px-12 bg-white flex-col shadow-md">
            <AnswerForm
              className="w-full mb-5"
              fields={formFields}
              onSubmit={submitAnswer}
            />
          </Card>
        )}
      </Main>
    </>
  );
};

export default Answer;
