import { ErrorMessage } from "@hookform/error-message";
import React, { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import ErrorText from "../ErrorText";
import FormLabel from "../FormLabel";
import { borderStyle, fontStyle, textInputStyle } from "../styles";
import { cx } from "@/utils/utils";

export interface TextFieldProps extends React.HTMLProps<HTMLInputElement> {
  name: string;
  label?: string;
  error?: string;
  isRequired?: boolean;
  type?: string;
  className?: string;
}

const TextField = ({
  name,
  label,
  isRequired,
  type,
  className,
  ...rest
}: TextFieldProps) => {
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
      <FormLabel className="mb-2" label={label} isRequired={isRequired} />
      <input
        type={type}
        className={cx(textInputStyle, fontStyle, border, className)}
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

TextField.defaultProps = {
  type: "text",
};

export default TextField;
