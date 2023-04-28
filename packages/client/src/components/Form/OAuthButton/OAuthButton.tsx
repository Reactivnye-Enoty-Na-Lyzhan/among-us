import React, { FC, memo } from 'react';
import logo from '../../../images/oauth/yandex-logo.svg';
import './OAuthButton.css';

type Props = {
  text: string;
  disabled: boolean;
  onClick: () => void;
};

const OAuthButton: FC<Props> = ({ text, disabled, onClick }) => {
  return (
    <>
    <button
      type="button"
      className="oauth-button form__oauth-button"
      disabled={disabled}
      onClick={onClick}>
      <img className="oauth-logo oauth-logo_space_right" src={logo} alt='яндекс лого' />
      {text}
    </button>
    </>
  );
};

export default memo(OAuthButton);
