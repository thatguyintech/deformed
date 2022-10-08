interface Props {
  label?: string;
  isRequired?: boolean;
  className?: string;
}

const FormLabel = ({ className, label, isRequired }: Props) => {
  return label ? (
    <p className={className}>
      {label} {isRequired && "*"}
    </p>
  ) : (
    <></>
  );
};

export default FormLabel;
