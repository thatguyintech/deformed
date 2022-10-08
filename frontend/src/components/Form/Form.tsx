import React, { FC } from "react";
import { FormProvider } from "react-hook-form";
import { UseFormReturn } from "react-hook-form/dist/types";
import TextField, { TextFieldProps } from "./TextField/TextField";

export interface FormProps extends UseFormReturn<any> {
  // @ts-ignore
  onSubmit(x): void;
  children: React.ReactNode;
  className?: string;
}

type Form<P> = FC<P> & {
  TextField: FC<TextFieldProps>;
};

const Form = ({ children, onSubmit, className, ...rest }: FormProps) => {
  return (
    <FormProvider {...rest}>
      <form className={className} onSubmit={rest.handleSubmit(onSubmit)}>
        {children}
      </form>
    </FormProvider>
  );
};

Form.Text = TextField;

export default Form;
