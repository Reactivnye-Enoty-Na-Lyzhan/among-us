import { useCallback, useState } from 'react';

export function useForm(defaultValues?: Record<string, string | undefined>) {
  const [values, setValues] = useState<Record<string, string | undefined>>(
    defaultValues ?? {}
  );

  const handleInputChange = useCallback((name: string, value?: string) => {
    setValues(prev => {
      return { ...prev, [name]: value };
    });
  }, []);

  return { values, handleInputChange, setValues };
}

