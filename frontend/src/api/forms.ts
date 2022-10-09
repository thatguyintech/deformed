import { getReq, postReq } from "./ApiHelpers";

export const createForm = ({ fields }: any) => {
  return postReq("/forms", { data: { fields } });
};

export const createAnswer = ({ formId, formAnswers }: any) => {
  return postReq(`/forms/${formId}/answers`, { data: { formAnswers } });
};

export const getForm = (formId: number) => {
  return getReq(`/forms/${formId}`);
};
