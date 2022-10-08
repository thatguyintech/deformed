export const textInputStyle = "h-13 w-full rounded px-5";

export const fontStyle = `
  font-size: 17rem;
  font-weight: 400;
  font-family: Inter, sans-serif;
`;

export const validBorderStyle = `
  border: 1.5px solid rgba(134, 142, 153, 0.5);
`;

export const errorBorderStyle = `
  border: 1.5px solid #d34646;
`;

export const borderStyle = (error: boolean) =>
  error ? errorBorderStyle : validBorderStyle;
