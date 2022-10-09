import Card from "@/components/Card/Card";
import DropdownMenu from "@/components/DropdownMenu/DropdownMenu";
import { borderStyle, textInputStyle } from "@/components/Form/styles";
import { cx } from "@/utils/utils";
import { useMemo, useState } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";

const Question = ({ name, index }: any) => {
  const {
    register,
    formState: { errors },
    setFocus,
    watch,
  } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    name: `fields.${index}.properties.choices`, // unique name for your Field Array
  });

  const [selectedType, setSelectedType] = useState("shortText");
  const numOptions = useMemo(() => {
    return watch()?.fields[index].properties?.choices?.length ?? 0;
  }, [watch()]);

  const items = [
    {
      id: "shortText",
      label: "Short Text",
      iconUrl: "",
      onClick: () => {
        setSelectedType("shortText");
        setFocus(`fields.${index}.title`);
        remove();
      },
    },
    {
      id: "longText",
      label: "Paragraph",
      iconUrl: "",
      onClick: () => {
        setSelectedType("longText");
        setFocus(`fields.${index}.title`);
        remove();
      },
    },
    {
      id: "multipleChoice",
      label: "Multiple Choice",
      iconUrl: "",
      onClick: () => {
        if (selectedType !== "multipleChoice") {
          setSelectedType("multipleChoice");
          append(`Option ${numOptions + 1}`, { shouldFocus: true });
          setFocus(`fields.${index}.title`);
        }
      },
    },
  ];

  const previewComponent = useMemo(() => {
    if (selectedType === "shortText") {
      return (
        <div className="p-2">
          <p className="mb-2 text-gray-600">Short answer text</p>
          <div
            className={cx(
              borderStyle(false),
              textInputStyle,
              "text-gray-400 text-sm"
            )}
          >
            <p>Answer here</p>
          </div>
        </div>
      );
    } else if (selectedType === "longText") {
      return (
        <div className="p-2">
          <p className="mb-2 text-gray-600">Long answer text</p>
          <div
            className={cx(
              borderStyle(false),
              textInputStyle,
              "text-gray-400 py-0 pb-10 pt-2 text-sm"
            )}
          >
            <p>Answer here</p>
          </div>
        </div>
      );
    } else if (selectedType === "multipleChoice") {
      return (
        <div className="p-2 flex flex-col gap-y-2">
          {fields.map((field, fieldIndex) => {
            console.log("field", field);
            return (
              <div key={`${field.id}`} className="flex items-center gap-x-2">
                <div className="rounded-[50%] h-[18px] w-[18px] border border-gray-400"></div>
                <input
                  className={cx("px-1 py-1 text-sm")}
                  {...register(
                    `fields.${index}.properties.choices.${fieldIndex}`
                  )}
                />
              </div>
            );
          })}
          <div
            className="flex items-center gap-x-2"
            onClick={() => {
              append(`Option ${numOptions + 1}`, { shouldFocus: true });
            }}
          >
            <div className="rounded-[50%] h-[18px] w-[18px] border border-gray-400"></div>
            <input
              value="Add option"
              className={cx(
                "px-1 py-1 disabled:bg-white p-0 text-sm cursor-text"
              )}
              disabled
            />
          </div>
        </div>
      );
    }
  }, [selectedType, fields]);

  return (
    <>
      <Card className="px-6 py-4">
        <div className="flex justify-between mb-3">
          <input
            className="border-b border-gray-500 px-2 py-1 mb-2 w-[50%]"
            type="text"
            {...register(`fields.${index}.title`)}
          />
          <DropdownMenu items={items} />
        </div>

        <div className="mb-6">{previewComponent}</div>

        <hr className="mb-4 bg-gray-400 h-[1px] border-none"></hr>

        <footer className="flex justify-end">
          <label className="flex gap-x-2 cursor-pointer">
            <input type="checkbox" {...register(`fields.${index}.required`)} />
            <p className="text-sm">Required</p>
          </label>
        </footer>
      </Card>
    </>
  );
};

export default Question;
