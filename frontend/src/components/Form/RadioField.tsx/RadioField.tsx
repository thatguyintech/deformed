import { ErrorMessage } from "@hookform/error-message";
import React, { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import ErrorText from "../ErrorText";
import FormLabel from "../FormLabel";
import { borderStyle, fontStyle, textInputStyle } from "../styles";
import { cx } from "@/utils/utils";

export interface RadioFieldProps extends React.HTMLProps<HTMLInputElement> {
  name: string;
  options: any[];
  label?: string;
  error?: string;
  isRequired?: boolean;
  type?: string;
  className?: string;
}

const RadioField = ({
  name,
  options,
  label,
  isRequired,
  className,
  ...rest
}: RadioFieldProps) => {
  const {
    register,
    unregister,
    formState: { errors },
  } = useFormContext();

  useEffect(() => {
    return () => {
      unregister(name);
    };
  }, [name, unregister]);

  const border = borderStyle(!!errors[name]);

  return (
    <>
      <div>
        <FormLabel className="mb-2" label={label} isRequired={isRequired} />

        {options?.map((option, index) => {
          return (
            <label className="flex gap-x-4">
              <input type="radio" {...register(name)} {...rest} />
              <p>{option}</p>
            </label>
          );
        })}

        <ErrorMessage
          name={name}
          errors={errors}
          render={({ message }: any) => <ErrorText>{message}</ErrorText>}
        />
      </div>
    </>
  );
};

export default RadioField;
