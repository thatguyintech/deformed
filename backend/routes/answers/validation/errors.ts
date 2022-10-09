import { ClientError, InternalServerError } from "../../../lib/error";

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
