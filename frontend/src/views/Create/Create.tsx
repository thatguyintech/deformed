import { createForm } from "@/api/forms";
import Button from "@/components/Button/Button";
import Card from "@/components/Card/Card";
import Form from "@/components/Form/Form";
import TextAreaField from "@/components/Form/TextAreaField.tsx/TextAreaField";
import TextField from "@/components/Form/TextField/TextField";
import StyledTab from "@/components/StyledTab/StyledTab";
import Toggle from "@/components/Toggle/Toggle";
import { Tab } from "@headlessui/react";
import { useMemo, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import Question from "./Question";

const Create = () => {
  const methods = useForm({
    defaultValues: {
      fields: [
        {
          type: "shortText",
          title: "Question 1",
          required: true,
          referenceId: `question-0`,
        },
      ],
    },
    mode: "all",
  });

  const { watch, control, handleSubmit } = methods;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "fields",
  });

  const numQuestions = useMemo(() => {
    return watch().fields.length;
  }, [watch()]);

  const onFormSubmit = handleSubmit(async (value) => {
    await createForm(value);
  });

  const [accessControlChecked, setAccessControlChecked] = useState(false);
  const [credentialsChecked, setCredentialsChecked] = useState(false);

  return (
    <>
      <Tab.Group onChange={() => {}}>
        <Tab.List className="mb-8 flex gap-x-11 justify-center">
          <StyledTab text="Questions" show></StyledTab>
          <StyledTab text="Settings" show></StyledTab>
        </Tab.List>
        <Tab.Panels>
          <Form onSubmit={onFormSubmit} {...methods}>
            <Tab.Panel>
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

              <div className="flex justify-end">
                <Button className="mt-8" type="submit">
                  Create
                </Button>
              </div>
            </Tab.Panel>
            <Tab.Panel>
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
                    User can respond only if they have any of the following
                    tokens:
                  </p>

                  {accessControlChecked && (
                    <>
                      <p className="text-sm text-gray-400 mt-2 mb-2">
                        Format: (contract address, token_id, token_id,...),
                        (contract address, token_id, token_id,...)
                      </p>
                      <TextAreaField
                        name={`accessControlTokens`}
                        placeholder="(0x138910238090192830, 12, 14, 15), (0x923042839429304, 16, 17, 18)"
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
                        Format: (contract address, token_id, token_id,...),
                        (contract address, token_id, token_id,...)
                      </p>
                      <TextAreaField
                        name="credentials"
                        placeholder="(0x138910238090192830, 12, 14, 15), (0x923042839429304, 16, 17, 18)"
                      />
                    </>
                  )}
                </div>
              </Card>
            </Tab.Panel>
          </Form>
        </Tab.Panels>
      </Tab.Group>

      {/* {JSON.stringify(watch())} */}
    </>
  );
};

export default Create;
