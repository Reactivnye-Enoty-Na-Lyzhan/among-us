import { useState } from 'react';

export type ValidationData = {
  field: string;
  isValid: boolean;
  text?: string;
};

export type ValidationRule = {
  field: string;
  validation: (value?: string) => { isValid: boolean; text: string };
};

export function useValidation(validations: ValidationRule[]) {
  const [validationData, setValidationData] = useState<ValidationData[]>([]);

  function validateForm(values: Record<string, string | undefined>) {
    const newValidationData: ValidationData[] = [];

    for (const validation of validations) {
      newValidationData.push({
        ...validation.validation(values[validation.field]),
        field: validation.field,
      });
    }

    setValidationData(newValidationData);

    return !newValidationData.some(v => v.isValid === false);
  }

  function validateField(field: string, value?: string) {
    const newValidationData: ValidationData[] = validationData.filter(
      d => d.field !== field
    );
    const validation = validations.find(v => v.field === field);

    if (validation) {
      newValidationData.push({
        ...validation.validation(value),
        field: validation.field,
      });
    }

    setValidationData(newValidationData);
  }

  function clearFieldValidation(field: string) {
    setValidationData(validationData.filter(d => d.field !== field));
  }

  return { validationData, validateForm, validateField, clearFieldValidation };
}
