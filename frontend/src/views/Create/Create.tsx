import { createForm } from "@/api/forms";
import Button from "@/components/Button/Button";
import Form from "@/components/Form/Form";
import TextField from "@/components/Form/TextField/TextField";
import { useMemo } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import Question from "./Question";

const Create = () => {
  const methods = useForm({
    defaultValues: { fields: [] },
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
    console.log(value);
    await createForm(value);
  });

  return (
    <>
      <h1 className="text-2xl font-semibold mb-4 text-center">Form Builder</h1>
      <Form onSubmit={onFormSubmit} {...methods}>
        {fields.map((field, index) => {
          return (
            <div className="mb-3">
              <Question
                key={field.id} // important to include key with field's id
                name={`fields.${index}`}
                id={index}
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

        <Button className="mt-8" type="submit">
          Create
        </Button>
      </Form>

      {JSON.stringify(watch())}
    </>
  );
};

export default Create;
