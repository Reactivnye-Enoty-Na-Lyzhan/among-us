import classNames from 'classnames';
import React, { FC } from 'react';
import './Form.css';

type Props = React.HTMLProps<HTMLFormElement> & {
  children: React.ReactNode;
  onSubmit: () => void;
};

const Form: FC<Props> = props => {
  const { children, onSubmit, className, ...htmlProps } = props;

  return (
    <form
      {...htmlProps}
      className={classNames('form', className)}
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
