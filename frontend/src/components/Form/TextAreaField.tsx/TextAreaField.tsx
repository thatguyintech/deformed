import { cx } from "@/utils/utils";
import { ErrorMessage } from "@hookform/error-message";
import React, { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import ErrorText from "../ErrorText";
import FormLabel from "../FormLabel";
import { borderStyle, fontStyle } from "../styles";

export interface TextAreaFieldProps
  extends React.HTMLProps<HTMLTextAreaElement> {
  name: string;
  label: string;
  error?: string;
  isRequired?: boolean;
  className?: string;
}

const TextAreaField = ({
  name,
  label,
  isRequired,
  className,
  ...rest
}: TextAreaFieldProps) => {
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

  return (
    <>
      <FormLabel className="mb-2" label={label} isRequired={isRequired} />
      <textarea
        className={cx(
          className,
          "w-full rounded py-[10px] px-3 resize-none !min-h-[100px]",
          fontStyle,
          borderStyle(!!errors.name)
        )}
        {...register(name)}
        {...rest}
      />

      <ErrorMessage
        name={name}
        errors={errors}
        render={({ message }: any) => <ErrorText>{message}</ErrorText>}
      />
    </>
  );
};

export default TextAreaField;
