import { createForm } from "@/api/forms";
import Button from "@/components/Button/Button";
import Card from "@/components/Card/Card";
import Form from "@/components/Form/Form";
import TextAreaField from "@/components/Form/TextAreaField.tsx/TextAreaField";
import StyledTab from "@/components/StyledTab/StyledTab";
import Toggle from "@/components/Toggle/Toggle";
import { useMemo, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import Question from "./Question";
import { Deformed__factory } from "@deformed/contracts";
import { ethers } from "ethers";
import { useWeb3Auth } from "../../hooks/useWeb3Auth";

const Create = () => {
  const methods = useForm({
    defaultValues: {
      fields: [],
      accessControlTokens: "",
      credentials: "",
    },
    mode: "all",
  });

  const { watch, control, handleSubmit } = methods;

  const { web3authProvider } = useWeb3Auth();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "fields",
  });

  const numQuestions = useMemo(() => {
    return watch().fields.length;
  }, [watch()]);

  const onFormSubmit = handleSubmit(async (formValues) => {
    const formHash = await createForm({ fields: formValues.fields });
    const provider = new ethers.providers.Web3Provider(web3authProvider);
    const deformed = Deformed__factory.connect(
      "0xfFAfd3b46D3034bB3f12868c92DCA375E7263C38",
      provider.getSigner()
    );
    await deformed.createForm(
      formHash.hash,
      convertTokenArrayStringIntoArray(formValues.accessControlTokens),
      convertTokenArrayStringIntoArray(formValues.credentials)
    );
  });

  const convertTokenArrayStringIntoArray = (tokenArrayString: string) => {
    // example:
    // input: (0xB876baF8F69cD35fb96A17a599b070FBdD18A6a1, 12), (0xB876baF8F69cD35fb96A17a599b070FBdD18A6a1, 16)
    // output: [{contractAddress: "0xB876baF8F69cD35fb96A17a599b070FBdD18A6a1", tokenId: 12}, {contractAddress: "0xB876baF8F69cD35fb96A17a599b070FBdD18A6a1", tokenId: 16}]
    const res = [];
    const tokens = tokenArrayString.replace(/\s/g, "").split(",");
    for (let i = 0; i < tokens.length; i += 2) {
      const contractAddress = tokens[i];
      const tokenId = tokens[i + 1];
      if (contractAddress && tokenId) {
        res.push({
          contractAddress: contractAddress.replace(/\(/g, ""),
          tokenId: tokenId.replace(/\)/g, ""),
        });
      }
    }
    return res;
  };

  const [accessControlChecked, setAccessControlChecked] = useState(false);
  const [credentialsChecked, setCredentialsChecked] = useState(false);
  const [tabIndex, setTabIndex] = useState(0);

  return (
    <>
      <div className="mb-8 flex gap-x-11 justify-center">
        <StyledTab
          text="Questions"
          show
          selected={tabIndex === 0}
          onClick={() => {
            setTabIndex(0);
          }}
        ></StyledTab>
        <StyledTab
          text="Settings"
          show
          selected={tabIndex === 1}
          onClick={() => {
            setTabIndex(1);
          }}
        ></StyledTab>
      </div>
      <Form onSubmit={onFormSubmit} {...methods}>
        <div className={tabIndex === 0 ? "" : "hidden"}>
          {fields.map((field, index) => {
            return (
              <div className="mb-3">
                <Question
                  key={field.id} // important to include key with field's id
                  name={`question-${index}`}
                  index={index}
                />
              </div>
            );
          })}
          <div className="flex justify-end">
            <div className="flex gap-x-4">
              <Button
                className="text-2xl font-bold"
                theme="custom"
                onClick={() => {
                  append({
                    type: "shortText",
                    title: "",
                    required: true,
                    referenceId: `question-${numQuestions}`,
                    properties: {
                      allowOtherChoice: false,
                      choices: [],
                    },
                  });
                }}
              >
                +
              </Button>
              <Button
                className="text-2xl font-bold"
                theme="custom"
                onClick={() => {
                  remove(numQuestions - 1);
                }}
              >
                -
              </Button>
            </div>
          </div>
        </div>
        <div className={tabIndex === 1 ? "" : "hidden"}>
          <Card className="px-9 py-6">
            <h2 className="font-semibold">Settings</h2>
            <hr className="mb-5 mt-2 bg-gray-400 h-[1px] border-none" />
            <div className="mb-7">
              <div className="flex justify-between items-center ">
                <p className="text-sm font-semibold">Require Tokens</p>

                <Toggle
                  checked={accessControlChecked}
                  onChange={() => {
                    setAccessControlChecked(!accessControlChecked);
                  }}
                />
              </div>
              <p className="text-sm text-gray-600">
                User can respond only if they have any of the following tokens:
              </p>

              {accessControlChecked && (
                <>
                  <p className="text-sm text-gray-400 mt-2 mb-2">
                    Format: (contract address, token_id), (contract address,
                    token_id)
                  </p>
                  <TextAreaField
                    name={`accessControlTokens`}
                    placeholder="(0xB876baF8F69cD35fb96A17a599b070FBdD18A6a1, 12), (0xB876baF8F69cD35fb96A17a599b070FBdD18A6a1, 16)"
                  />
                </>
              )}
            </div>

            <div>
              <div className="flex justify-between items-center">
                <p className="text-sm font-semibold">Credentials</p>

                <Toggle
                  checked={credentialsChecked}
                  onChange={() => {
                    setCredentialsChecked(!credentialsChecked);
                  }}
                />
              </div>
              <p className="text-sm text-gray-600">
                Flag responses with any of the following tokens:{" "}
              </p>

              {credentialsChecked && (
                <>
                  <p className="text-sm text-gray-400 mt-2 mb-2">
                    Format: (contract address, token_id), (contract address,
                    token_id)
                  </p>
                  <TextAreaField
                    name="credentials"
                    placeholder="(0xB876baF8F69cD35fb96A17a599b070FBdD18A6a1, 12), (0xB876baF8F69cD35fb96A17a599b070FBdD18A6a1, 16)"
                  />
                </>
              )}
            </div>
          </Card>
        </div>
        <div className="flex justify-end">
          <Button className="mt-8" type="submit">
            Create
          </Button>
        </div>
      </Form>
    </>
  );
};

export default Create;
