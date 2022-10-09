import { ClientError, InternalServerError } from "../../../lib/error";

export class InvalidForm extends ClientError {
  constructor(formHash?: string) {
    super(`Form with hash ${formHash} is invalid or not found.`);
    this.name = "InvalidForm";
  }
}

export class InvalidFormFieldReferenceId extends ClientError {
  constructor(formFieldReferenceId: string, formHash: string) {
    super(
      `"${formFieldReferenceId}" is not a valid referenceId for form hash ${formHash}`,
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
  constructor(formHash: string, fieldName: string) {
    super(
      `Form ${formHash} field "${fieldName}" has missing required properties.`,
    );
    this.name = "MisconfiguredForm";
  }
}
