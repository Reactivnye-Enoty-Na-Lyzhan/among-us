import { useMemo, useState } from 'react';

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
  const [validationData, setValidationData] = useState<
    Record<string, ValidationData>
  >({});

  const isFormValid = useMemo(() => {
    return Object.values(validationData).every(d => d.isValid);
  }, [validationData]);

  function validateForm(values: Record<string, string | undefined>) {
    const newValidationData: Record<string, ValidationData> = {};
    let isValid = true;

    for (const validation of validations) {
      newValidationData[validation.field] = {
        ...validation.validation(values[validation.field]),
        field: validation.field,
      };

      if (isValid && !newValidationData[validation.field].isValid) {
        isValid = false;
      }
    }

    setValidationData(newValidationData);

    return isValid;
  }

  function validateField(field: string, value?: string) {
    const newValidationData: Record<string, ValidationData> = {
      ...validationData,
    };
    const validation = validations.find(v => v.field === field);

    if (validation) {
      newValidationData[validation.field] = {
        ...validation.validation(value),
        field: validation.field,
      };
    }

    setValidationData(newValidationData);
  }

  function clearFieldValidation(field: string) {
    const newValidationData: Record<string, ValidationData> = {
      ...validationData,
    };
    delete newValidationData[field];

    setValidationData(newValidationData);
  }

  return {
    validationData,
    isFormValid,
    validateForm,
    validateField,
    clearFieldValidation,
  };
}
