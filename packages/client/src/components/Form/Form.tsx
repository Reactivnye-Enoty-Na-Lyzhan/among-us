import React, { FC } from 'react';
import './Form.css';

type Props = {
  children: React.ReactNode;
  onSubmit: () => void;
};

const Form: FC<Props> = ({ children, onSubmit }: Props) => {
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
};

export default Form;
