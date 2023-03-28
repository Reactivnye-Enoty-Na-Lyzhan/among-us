import { useState } from 'react';

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
