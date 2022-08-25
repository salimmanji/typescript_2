// Validation Logic
export interface Validatable {
  //describes a validatable obj
  value: string | number;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
}

export function validate(validatableInput: Validatable) {
  // Gets a validatable object, which follows the structure above
  let isValid = true;
  if (validatableInput.required) {
    // check to see if we have a required property, and the value msut be required
    isValid = isValid && validatableInput.value.toString().trim().length !== 0;
  }
  if (
    validatableInput.minLength != null &&
    typeof validatableInput.value === "string"
  ) {
    // ensure the value is a string
    isValid =
      isValid &&
      validatableInput.value.trim().length >= validatableInput.minLength; // ensure the value is longer than minLength
  }
  if (
    validatableInput.maxLength != null &&
    typeof validatableInput.value === "string"
  ) {
    // ensure the value is a string
    isValid =
      isValid &&
      validatableInput.value.trim().length <= validatableInput.maxLength; // ensure the value is longer than minLength
  }
  if (
    validatableInput.min != null &&
    typeof validatableInput.value === "number"
  ) {
    // check numbers
    isValid = isValid && validatableInput.value >= validatableInput.min;
  }
  if (
    validatableInput.max != null &&
    typeof validatableInput.value === "number"
  ) {
    isValid = isValid && validatableInput.value <= validatableInput.max;
  }
  return isValid;
}
