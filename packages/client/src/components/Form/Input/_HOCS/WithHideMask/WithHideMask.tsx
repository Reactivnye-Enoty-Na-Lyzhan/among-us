import { useState } from 'react';
import { EnumFormInputType } from '../../_enums';
import classNames from 'classnames';
import './WithHideMask.css';

export function WithHideMask<P extends React.HTMLProps<HTMLInputElement>>(
  InputComponent: React.FC<P>
) {
  return function InputWithHideMask(props: P) {
    const [isMasked, setIsMasked] = useState(true);

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
            }}></div>
        </InputComponent>
      </>
    );
  };
}
