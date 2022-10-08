import { cx } from "@/utils/utils";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
}

const ErrorText = ({ children, className }: Props) => {
  return (
    <>
      <p className={cx("mt-2 !text-[#df4146] !text-[12px]", className)}>
        {children}
      </p>
    </>
  );
};

export default ErrorText;
