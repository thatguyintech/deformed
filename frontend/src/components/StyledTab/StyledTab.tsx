import { cx } from "@/utils/utils";

const tabStyle = (selected: boolean) =>
  cx("!font-bold", !selected ? "!text-[#1A1A1A80]" : "");

const StyledTab = ({ show, text, selected, onClick }: any) => {
  return (
    <div
      className={cx(
        "focus:outline-none focus:hover:opacity-100 hover:opacity-60 transition duration 200 ease-out cursor-pointer",
        show ? "" : "hidden"
      )}
      onClick={onClick}
    >
      <div className="relative">
        <h3 className={tabStyle(selected)}>{text}</h3>
        {selected && (
          <span className="w-full h-[2px] absolute bottom-[-0.2rem] left-0 bg-black"></span>
        )}
      </div>
    </div>
  );
};

export default StyledTab;
