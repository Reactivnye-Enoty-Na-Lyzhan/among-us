import classNames from 'classnames';
import { useState } from 'react';

export function useInputMask(initIsMasked: true) {
  const [isMasked, setIsMasked] = useState(false);

  return (
    <div
      className={classNames('form-input__mask', {
        'form-input__mask_show': isMasked,
      })}
      onClick={() => {
        setIsMasked(!isMasked);
      }}></div>
  );
}
