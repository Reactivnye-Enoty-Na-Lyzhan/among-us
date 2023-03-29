import React from 'react';
import './style.css';

type Props = {
  children: React.ReactNode;
  onSubmit: () => void;
};

export default function Form({ children, onSubmit }: Props) {
  return (
    <form
      className="form"
      noValidate
      onSubmit={(e: React.FormEvent) => {
        e.preventDefault();
        onSubmit();
      }}>
      {children}
    </form>
  );
}
