import Card from "@/components/Card/Card";
import { useFieldArray, useFormContext } from "react-hook-form";

const Question = ({ name, id }: any) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const { fields } = useFieldArray({
    name: name, // unique name for your Field Array
  });

  return (
    <>
      <Card className="px-6 py-4">
        <input
          className="border-b border-gray-500 px-2 py-1 mb-3"
          type="text"
          {...register(`${name}.title`)}
        />
        <footer className="flex justify-end">
          <label className="flex gap-x-2">
            <input type="checkbox" {...register(`${name}.required`)} />
            <p>Required</p>
          </label>
        </footer>
      </Card>
    </>
  );
};

export default Question;
