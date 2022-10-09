import { Menu } from "@headlessui/react";
import { fontStyle } from "../Form/styles";
import {
  ChevronDownIcon,
  Bars2Icon,
  Bars3BottomLeftIcon,
  ListBulletIcon,
} from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import { cx } from "@/utils/utils";

const iconForId = (id: string | undefined) => {
  if (id === "shortText") {
    return <Bars2Icon />;
  } else if (id === "longText") {
    return <Bars3BottomLeftIcon />;
  } else if (id === "multipleChoice") {
    return <ListBulletIcon />;
  }

  return <></>;
};

const DropdownMenu = ({ items }: { items: DropdownMenuItem[] }) => {
  const [selected, setSelected] = useState<DropdownMenuItem | undefined>({
    id: "",
    label: "",
    iconUrl: "",
    onClick: () => {},
  });

  useEffect(() => {
    if (items?.length && !selected?.id) {
      setSelected(items[0]);
    }
  }, [items]);

  return (
    <>
      <Menu>
        {({ open }: { open: boolean }) => (
          <div className="relative">
            <Menu.Button className="relative">
              <div
                className={cx(
                  "rounded h-13 flex items-center justify-between px-2 py-1 min-w-[12rem]",
                  fontStyle,
                  "border border-gray-400"
                )}
              >
                <div className={cx("flex items-center", textOverflowStyle)}>
                  {selected?.iconUrl && (
                    <figure className={iconStyle}>
                      <img
                        className={cx("rounded-[4rem]", mediaStyle)}
                        src={selected?.iconUrl}
                        alt=""
                      />
                    </figure>
                  )}
                  <figure className={iconStyle}>
                    {iconForId(selected?.id)}
                  </figure>
                  <p className={cx(textOverflowStyle, "mr-4")}>
                    {selected?.label}
                  </p>
                </div>

                <ChevronDownIcon className="h-4 w-4 flex-none" />
              </div>
            </Menu.Button>

            <Menu.Items
              className={cx(
                "absolute origin-top-right overflow-y-auto shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10 min-w-[180px] rounded-[16px] pb-2 pt-1 max-h-[150px] overflow-hidden"
              )}
            >
              {items?.map((item: DropdownMenuItem) => {
                return (
                  <DropdownMenuItem
                    key={item?.id}
                    {...item}
                    onClick={async () => {
                      await item.onClick();
                      setSelected(item);
                    }}
                  />
                );
              })}
            </Menu.Items>
          </div>
        )}
      </Menu>
    </>
  );
};

export interface DropdownMenuItem {
  id: string;
  label: string;
  iconUrl: string;
  onClick: () => void;
}

const DropdownMenuItem = ({
  id,
  label,
  iconUrl,
  onClick,
}: DropdownMenuItem) => {
  return (
    <>
      <Menu.Item>
        {({ active }) => (
          <button
            type="button"
            className={cx(
              active && "bg-[#f5f5f5]",
              textOverflowStyle,
              "group flex w-full items-center rounded-[8px] px-4 py-2 max-w-[400px] text-"
            )}
            onClick={onClick}
          >
            {iconUrl && (
              <figure className={iconStyle}>
                <img
                  className={cx("rounded-[4rem]", mediaStyle)}
                  src={iconUrl}
                  alt=""
                />
              </figure>
            )}
            <figure className={iconStyle}>{iconForId(id)}</figure>
            <p className={textOverflowStyle}>{label}</p>
          </button>
        )}
      </Menu.Item>
    </>
  );
};
const textOverflowStyle =
  "text-ellipsis whitespace-nowrap overflow-hidden text-sm";
const iconStyle = "!h-5 !w-5 rounded-[4rem] mr-2 flex-none";
const mediaStyle = "";

export default DropdownMenu;
