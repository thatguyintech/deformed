import { useState } from "react";
import { Switch } from "@headlessui/react";

const Toggle = ({ checked, onChange }: any) => {
  const transitionStyle = "transition duration-150 ease-out";

  return (
    <Switch
      checked={checked}
      onChange={onChange}
      className={`${
        checked ? "bg-blue-600" : "bg-gray-300"
      } relative inline-flex h-6 w-11 items-center rounded-full ${transitionStyle}`}
    >
      <span className="sr-only">Enable notifications</span>
      <span
        className={`${
          checked ? "translate-x-6" : "translate-x-1"
        } inline-block h-4 w-4 transform rounded-full bg-white transition`}
      />
    </Switch>
  );
};

export default Toggle;
