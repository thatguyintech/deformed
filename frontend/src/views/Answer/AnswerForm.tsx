import Form from "../../components/Form/Form";
import { useForm } from "react-hook-form";
import TextField from "../../components/Form/TextField/TextField";
import Button from "../../components/Button/Button";
import TextAreaField from "@/components/Form/TextAreaField.tsx/TextAreaField";
import RadioField from "@/components/Form/RadioField.tsx/RadioField";

const Answer = ({ className, fields, onSubmit }: any) => {
  const methods = useForm({
    mode: "all",
  });

  const { handleSubmit, formState, reset, watch, getValues } = methods;

  const submitForm = handleSubmit(async () => {
    await onSubmit(getValues());
  });

  const getFormComponentFromType = (type: string) => {
    if (type === "ethAddress" || type === "shortText") {
      return TextField;
    } else if (type === "longText") {
      return TextAreaField;
    } else if (type === "multipleChoice") {
      return RadioField;
    }
  };

  const getTemplateFromFields = (fields: any) => {
    return fields?.map((field: any) => {
      const Component = getFormComponentFromType(field.type);

      return (
        // @ts-ignore
        <Component
          className="mb-7 w-full"
          key={field.referenceId}
          name={field.referenceId}
          label={field.title}
          options={
            field.type === "multipleChoice"
              ? field.properties.choices
              : undefined
          }
          placeholder={"Answer here"}
          isRequired
        />
      );
    });
  };

  return (
    <>
      <Form {...methods} onSubmit={submitForm} className={className}>
        {getTemplateFromFields(fields)}
        <div className="flex gap-x-7 items-center justify-end">
          <Button theme="custom">
            <p className="!font-semibold">Cancel</p>
          </Button>
          <Button type="submit">{"Submit"}</Button>
        </div>
      </Form>
    </>
  );
};

export default Answer;
