import { cx } from "@/utils/utils";

const Card = ({ className, children }: any) => {
  return (
    <>
      <div
        className={cx(
          className,
          "min-h-5 min-w-10 border shadow-md rounded-lg p-4"
        )}
      >
        {children}
      </div>
    </>
  );
};

export default Card;
