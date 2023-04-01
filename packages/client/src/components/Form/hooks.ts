import { useState } from 'react';

export function useForm(initValues?: Record<string, string | undefined>) {
  const [values, setValues] = useState<Record<string, string | undefined>>(
    initValues ?? {}
  );

  function handleInputChange(name: string, value?: string) {
    const newValues = { ...values };
    newValues[name] = value;
    setValues(newValues);
  }

  return { values, handleInputChange };
}
