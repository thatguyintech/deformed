import { cx } from "@/utils/utils";

interface Props {
  label?: string;
  isRequired?: boolean;
  className?: string;
}

const FormLabel = ({ className, label, isRequired }: Props) => {
  return label ? (
    <p className={cx(className, "font-semibold")}>
      {label} <span className="text-red-400">{isRequired && "*"}</span>
    </p>
  ) : (
    <></>
  );
};

export default FormLabel;
