import { postReq } from "./ApiHelpers";

export const createForm = ({ fields }: any) => {
  return postReq("/forms", { data: { fields } });
};
