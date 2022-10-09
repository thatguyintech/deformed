export enum FormFieldType {
  ShortText = "shortText",
  LongText = "longText",
  Rating = "rating",
  MultipleChoice = "multipleChoice",
}

export type FormFieldProperties = {
  // rating properties
  steps?: number;

  // multipleChoice properties
  choices?: string[];
};

export type FormField = {
  referenceId: string;
  required: boolean;
  title: string;
  description: string;
  type: FormFieldType;
  properties?: FormFieldProperties;
};

export type Form = {
  fields: FormField[];
};
