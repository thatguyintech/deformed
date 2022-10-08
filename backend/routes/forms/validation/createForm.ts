import { checkSchema, CustomValidator } from "express-validator";

import {
  FormField,
  FormFieldType,
} from "../../../global/types";
import { convertToInteger } from "../../../lib/validation";

import {
  InvalidFormFieldParameterValue,
  InvalidFormFieldPropertiesValue,
  InvalidFormFields,
  MissingFormFieldProperties,
} from "./errors";

const FormFieldValidations = {
  MAX_TITLE_LENGTH: 250,
  MAX_DESCRIPTION_LENGTH: 1000,
  MAX_REFERENCE_ID_LENGTH: 50,
  MAX_NUM_CHOICES: 200,
  MAX_CHOICE_LENGTH: 100,
  MAX_STEPS: 10,
};

const ratingPropertiesValidator = (field: FormField) => {
  if (!field.properties || !field.properties.steps) {
    throw new MissingFormFieldProperties(FormFieldType.Rating, [
      "steps",
    ]);
  }
  if (
    convertToInteger(field.properties.steps) >
    FormFieldValidations.MAX_STEPS
  ) {
    throw new InvalidFormFieldPropertiesValue(
      "steps",
      field.properties.steps,
      `Must be less than ${FormFieldValidations.MAX_STEPS}`,
    );
  }
};

const multipleChoicePropertiesValidator = (field: FormField) => {
  if (
    !field.properties ||
    !field.properties.choices ||
    !field.properties.allowOtherChoice
  ) {
    throw new MissingFormFieldProperties(FormFieldType.MultipleChoice, [
      "choices",
      "allowOtherChoice",
    ]);
  }
  const choices = field.properties.choices;
  if (
    !choices.length ||
    choices.length > FormFieldValidations.MAX_NUM_CHOICES
  ) {
    throw new InvalidFormFieldPropertiesValue(
      "choices",
      choices.toString(),
      `Number of choices must be between 1-${FormFieldValidations.MAX_NUM_CHOICES}.`,
    );
  }
  if (typeof field.properties.allowOtherChoice !== "boolean") {
    throw new InvalidFormFieldPropertiesValue(
      "allowOtherChoice",
      field.properties.allowOtherChoice,
      `Must be boolean (true, false).`,
    );
  }
  choices.forEach((choice) => {
    if (typeof choice !== "string") {
      throw new InvalidFormFieldPropertiesValue(
        "choices",
        choice,
        `Must be a valid string.`,
      );
    }
    if (
      !choice.length ||
      choice.length > FormFieldValidations.MAX_CHOICE_LENGTH
    ) {
      throw new InvalidFormFieldPropertiesValue(
        "choices",
        choice,
        `Length must be between 1-${FormFieldValidations.MAX_CHOICE_LENGTH}.`,
      );
    }
  });
};

const propertiesValidators: {
  [formFieldType: string]: (field: FormField) => void;
} = {
  [FormFieldType.MultipleChoice]: multipleChoicePropertiesValidator,
  [FormFieldType.Rating]: ratingPropertiesValidator,
};

const fieldTypePropertiesValidator: CustomValidator = async (value) => {
  // Validate additional properties exist for some field types
  if (value.type in propertiesValidators) {
    propertiesValidators[value.type](value);
  }
};

const fieldsValidator: CustomValidator = async (value, { req }) => {
  const fields = req.body.fields;

  if (!Array.isArray(fields) || !fields.length) {
    throw new InvalidFormFields(fields);
  }
  const uniqueReferenceIds = new Set<string>();

  fields.forEach((field: FormField) => {
    if (!field.referenceId || uniqueReferenceIds.has(field.referenceId)) {
      throw new InvalidFormFieldParameterValue(
        "referenceId",
        field.referenceId,
        `Value must be unique from other field referenceIds in form.`,
      );
    }
    uniqueReferenceIds.add(field.referenceId);
  });
};

export const createFormValidator = checkSchema({
  "fields": {
    isArray: {
      options: { min: 1 },
    },
    custom: {
      options: fieldsValidator,
    },
  },
  "fields.*": {
    isObject: true,
    custom: {
      options: fieldTypePropertiesValidator,
    },
  },
  "fields.*.type": {
    isString: true,
    isIn: {
      options: [Object.values(FormFieldType)],
      errorMessage: `"type" must be one of the following: [${Object.values(
        FormFieldType,
      )}]`,
    },
  },
  "fields.*.title": {
    isString: true,
    isLength: {
      errorMessage: `"title" must be between 1-${FormFieldValidations.MAX_TITLE_LENGTH} characters.`,
      options: { min: 1, max: FormFieldValidations.MAX_TITLE_LENGTH },
    },
  },
  "fields.*.description": {
    isString: true,
    optional: true,
    isLength: {
      errorMessage: `"description" must be less than ${FormFieldValidations.MAX_DESCRIPTION_LENGTH} characters if provided.`,
      options: { min: 1, max: FormFieldValidations.MAX_DESCRIPTION_LENGTH },
    },
  },
  "fields.*.required": {
    isBoolean: true,
    errorMessage: `"required" must be a boolean (true, false).`,
  },
  "fields.*.referenceId": {
    isString: true,
    isLength: {
      errorMessage: `"referenceId" must be between 1-${FormFieldValidations.MAX_REFERENCE_ID_LENGTH} characters.`,
      options: {
        min: 1,
        max: FormFieldValidations.MAX_REFERENCE_ID_LENGTH,
      },
    },
  },
});
