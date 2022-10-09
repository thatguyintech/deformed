import { postReq } from "./ApiHelpers";

export const createForm = ({ fields }: any) => {
  return postReq("/forms", { data: { fields } });
};

export const createAnswer = ({ formId, formAnswers }: any) => {
  return postReq("/forms/answers", { data: { formId, formAnswers } });
};
