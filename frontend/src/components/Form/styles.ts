export const textInputStyle = "h-13 w-full rounded px-3 py-2";

export const fontStyle = "";

export const validBorderStyle = "border border-gray-400";

export const errorBorderStyle = "border border-[#d34646]";

export const borderStyle = (error: boolean) =>
  error ? errorBorderStyle : validBorderStyle;
