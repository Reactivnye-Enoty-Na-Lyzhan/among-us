import React from 'react';

type Props = {
  children: React.ReactNode;
  onSubmit: () => void;
};

export default function Form({ children, onSubmit }: Props) {
  return (
    <form
      noValidate
      onSubmit={(e: React.FormEvent) => {
        e.preventDefault();
        onSubmit();
      }}>
      {children}
    </form>
  );
}
