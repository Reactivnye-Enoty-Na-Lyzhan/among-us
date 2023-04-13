import classNames from 'classnames';
import { FC, memo } from 'react';
import './NavigationButton.css';

type Props = {
  title: string;
  action?: 'next';
  buttonType?: 'submit' | 'button';
  isFormValid?: boolean;
  handleClick: () => void;
};

const NavigationButton: FC<Props> = props => {
  const {
    title,
    action = '',
    isFormValid = true,
    buttonType = 'button',
    handleClick,
  } = props;

  const buttonClass = classNames('create-game__form-navigation', {
    ['create-game__form-navigation_action_next']: action === 'next',
  });

  const iconClass = classNames('create-game__button-icon', {
    ['create-game__button-icon_action_next']: action === 'next',
  });

  return (
    <button
      className={buttonClass}
      disabled={!isFormValid}
      type={buttonType}
      onClick={handleClick}>
      <span className="create-game__button-title">{title}</span>
      <span className={iconClass}></span>
    </button>
  );
};

export default memo(NavigationButton);
