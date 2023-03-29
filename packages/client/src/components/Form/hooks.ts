import { useState } from 'react';

export type ValidationData = {
  field: string;
  isValid: boolean;
  text?: string;
};

export function useForm(defaultValues?: Record<string, string | undefined>) {
  const [values, setValues] = useState<Record<string, string | undefined>>(
    defaultValues ?? {}
  );

  function handleInputChange(name: string, value?: string) {
    const newValues = { ...values };
    newValues[name] = value;
    setValues(newValues);
  }

  return { values, handleInputChange };
}

export function useValidation(
  validations: { field: string; validation: any }[]
) {
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

  function clearFieldValidation(field: string) {
    setValidationData(validationData.filter(d => d.field !== field));
  }

  return { validationData, validateForm, clearFieldValidation };
}
