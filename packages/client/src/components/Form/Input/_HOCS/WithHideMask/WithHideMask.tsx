import { useState, FC } from 'react';
import classNames from 'classnames';
import './WithHideMask.css';

const EnumFormInputType = {
  PASSWORD: 'password',
  TEXT: 'text',
};

type Props = {
  onMaskToggleCallback?: () => void;
};

export function WithHideMask<P extends React.HTMLProps<HTMLInputElement>>(
  InputComponent: React.FC<P>
): FC<P & Props> {
  return function InputWithHideMask(props: P & Props) {
    const [isMasked, setIsMasked] = useState(true);
    const { onMaskToggleCallback } = props;

    const { type } = props;
    const typeProp = {} as { type: string };
    if (isMasked) {
      typeProp.type = EnumFormInputType.PASSWORD;
    } else if (type === EnumFormInputType.PASSWORD) {
      typeProp.type = EnumFormInputType.TEXT;
    }

    console.log(`RENDER ${props.name?.toUpperCase()} WITH HIDE MASK`);
    console.log(
      `WITH HIDE MASK INPUT TYPE: ${props.type} -> ${
        typeProp.type ?? props.type
      }`
    );

    return (
      <>
        <InputComponent {...props} {...typeProp}>
          <div
            className={classNames('form-input__mask', {
              'form-input__mask_show': isMasked,
            })}
            onClick={() => {
              setIsMasked(!isMasked);
              onMaskToggleCallback?.();
            }}></div>
        </InputComponent>
      </>
    );
  };
}
