import React, { useMemo } from 'react';
import type { Props as InputProps } from './Input/typings';
import { TFormContextValue } from './typings';
import './Form.css';

type FormProps = {
  children: React.FC<InputProps>[];
  onSubmit: React.FormEventHandler<HTMLFormElement>;
};

function Form<Fields extends string = string>(props: FormProps) {
  const formContext = useMemo(() => {
    const context = React.createContext<TFormContextValue<Fields>>({
      inputsValues: {},
    });

    return context;
  }, []);

  const children = useMemo(
    () =>
      props.children.map((renderFunc, index) =>
        renderFunc({ key: index, context: formContext })
      ),
    []
  );

  return (
    <form
      className="form"
      noValidate
      onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
      }}>
      {children}
    </form>
  );
}

export default Form;
