import { FormFieldType } from "../../../global/types";
import { ClientError } from "../../../lib/error";

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
  constructor(
    formFieldType: FormFieldType,
    requiredProperties: string[],
  ) {
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
