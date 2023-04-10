import { useCallback, useMemo, useState } from 'react';

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
    return !Object.entries(validationData).some(d => !d[1].isValid);
  }, [validationData]);

  const validateForm = useCallback(
    (values: Record<string, string | undefined>) => {
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
    },
    []
  );

  const validateField = useCallback((field: string, value?: string) => {
    setValidationData(prev => {
      const newValidationData: Record<string, ValidationData> = {
        ...prev,
      };
      delete newValidationData[field];
      const validation = validations.find(v => v.field === field);

      if (validation) {
        newValidationData[validation.field] = {
          ...validation.validation(value),
          field: validation.field,
        };
      }

      return newValidationData;
    });
  }, []);

  const clearFieldValidation = useCallback((field: string) => {
    setValidationData(prev => {
      const newValidationData: Record<string, ValidationData> = {
        ...prev,
      };
      delete newValidationData[field];

      return newValidationData;
    });
  }, []);

  return {
    validationData,
    isFormValid,
    validateForm,
    validateField,
    clearFieldValidation,
  };
}
