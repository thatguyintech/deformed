import { FormFieldType } from "../../../global/types";
import { ClientError, InternalServerError } from "../../../lib/error";

export class InvalidFormFields extends ClientError {
  constructor(fields: any) {
    super(
      `Form "fields" value must be a list that is not empty, value provided: ${fields}.`,
    );
    this.name = "InvalidFormFields";
  }
}

export class InvalidFormFieldParameterValue extends ClientError {
  constructor(
    formFieldParameter: string,
    value: string | boolean,
    additionalMessage?: string,
  ) {
    super(
      `"${value}" is not a valid value for form field parameter "${formFieldParameter}". ${additionalMessage}`,
    );
    this.name = "InvalidFormFieldParameterValue";
  }
}

export class MissingFormFieldProperties extends ClientError {
  constructor(formFieldType: FormFieldType, requiredProperties: string[]) {
    super(
      `Missing properties for form field type "${formFieldType}", required properties: ${requiredProperties}.`,
    );
    this.name = "MissingFormFieldProperties";
  }
}

export class InvalidFormFieldPropertiesValue extends ClientError {
  constructor(
    propertyName: string,
    value: string | number,
    additionalMessage?: string,
  ) {
    super(
      `"${value}" is not a valid value for "${propertyName} in form field properties". ${additionalMessage}`,
    );
    this.name = "InvalidFormFieldPropertiesValue";
  }
}

export class InvalidForm extends ClientError {
  constructor(formId?: string) {
    super(`Form with ID ${formId} is invalid or not found.`);
    this.name = "InvalidForm";
  }
}

export class InvalidFormFieldReferenceId extends ClientError {
  constructor(formFieldReferenceId: string, formId: string) {
    super(
      `"${formFieldReferenceId}" is not a valid referenceId for form ID ${formId}`,
    );
    this.name = "InvalidFormFieldReferenceId";
  }
}

export class InvalidAnswerFieldValue extends ClientError {
  constructor(fieldName: string, fieldValue: string, customMessage?: string) {
    super(
      `"${fieldValue}" is not a valid value for ${fieldName} field. ${customMessage}`,
    );
    this.name = "InvalidAnswerFieldValue";
  }
}

export class MisconfiguredForm extends InternalServerError {
  constructor(formId: string, fieldName: string) {
    super(
      `Form ${formId} field "${fieldName}" has missing required properties.`,
    );
    this.name = "MisconfiguredForm";
  }
}
