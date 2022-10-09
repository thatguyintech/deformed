import { checkSchema, CustomValidator } from "express-validator";

import { Form, FormField, FormFieldType } from "../../../global/types";
import { deformed } from "../../../lib/protocol";
import { retrieve } from "../../../lib/storage";
import { convertToInteger } from "../../../lib/validation";

import {
  InvalidAnswerFieldValue,
  InvalidForm,
  InvalidFormFieldReferenceId,
  MisconfiguredForm,
} from "./errors";

type FormAnswer = {
  value?: string | number;
  referenceId: string;
};

const AnswerValidations = {
  MAX_SHORT_TEXT_LENGTH: 100,
  MAX_LONG_TEXT_LENGTH: 500,
};

const formAnswersValidator: CustomValidator = async (value, { req }) => {
  if (!req.params || !req.params.formId) {
    throw new InvalidForm(req.params?.formId);
  }
  const formId = req.params.formId as string;

  const hash = (await deformed.forms(formId)).configIPFSHash;

  const [cid, fileName] = hash.split("/");

  const form = JSON.parse(await retrieve(cid, fileName)) as Form;

  if (!form || !form.fields) {
    throw new InvalidForm(formId);
  }

  const formAnswers = req.body.formAnswers;
  formAnswers.forEach((answer: FormAnswer) => {
    const value = answer.value as string;
    const referenceId = answer.referenceId;

    const formField = (form.fields as Array<FormField>).find(
      (field) => field.referenceId === referenceId,
    );

    if (!formField) {
      throw new InvalidFormFieldReferenceId(referenceId, formId);
    }

    if (formField.required && !value) {
      throw new InvalidAnswerFieldValue(
        formField.title,
        value,
        `Value must be provided for required field "${formField.title}".`,
      );
    }

    switch (formField.type) {
      case FormFieldType.ShortText:
        if (value.length > AnswerValidations.MAX_SHORT_TEXT_LENGTH) {
          throw new InvalidAnswerFieldValue(
            formField.title,
            value,
            `Value must be <= ${AnswerValidations.MAX_SHORT_TEXT_LENGTH} characters.`,
          );
        }
        break;
      case FormFieldType.LongText:
        if (value.length > AnswerValidations.MAX_LONG_TEXT_LENGTH) {
          throw new InvalidAnswerFieldValue(
            formField.title,
            value,
            `Value must be <= ${AnswerValidations.MAX_LONG_TEXT_LENGTH} characters.`,
          );
        }
        break;
      case FormFieldType.Rating: {
        const integerValue = convertToInteger(value);
        if (!formField.properties || !formField.properties.steps) {
          throw new MisconfiguredForm(formId, formField.title);
        }
        if (
          integerValue < 1 ||
          (formField.properties && integerValue > formField.properties.steps)
        ) {
          throw new InvalidAnswerFieldValue(
            formField.title,
            value,
            `Value must be between 1-${formField.properties.steps}.`,
          );
        }
        break;
      }
      case FormFieldType.MultipleChoice: {
        if (!formField.properties || !formField.properties.choices) {
          throw new MisconfiguredForm(formId, formField.title);
        }
        break;
      }
    }
  });
};

export const createAnswerValidator = checkSchema({
  formAnswers: {
    isArray: true,
    custom: {
      options: formAnswersValidator,
    },
  },
});
