import React from 'react';
import './Banner.css';
import classNames from 'classnames';

interface BannerProps {
  outcome: 'civil' | 'impostor' | 'killed';
}

const Banner: React.FC<BannerProps> = ({ outcome }) => {
  const bannerText = {
    civil: {
      bannerText: 'Игра началась',
      bannerSubText: 'Ты играешь за мирного',
      backgroundColor: 'innocent',
    },
    impostor: {
      bannerText: 'Игра началась',
      bannerSubText: 'Ты играешь за предателя',
      backgroundColor: 'traitor',
    },
    killed: {
      bannerText: 'Для тебя игра закончилась',
      bannerSubText: 'Вот так. Зря ты остался один',
      backgroundColor: 'end',
    },
  };

  const bannerClassname = classNames('banner', {
    [`banner_background_${bannerText[outcome].backgroundColor}`]: true,
  });

  return (
    <div className={bannerClassname}>
      <div className="banner__wrapper">
        <p className="banner__text">{bannerText[outcome].bannerText}</p>
        <p className="banner__subtext">{bannerText[outcome].bannerSubText}</p>
      </div>
    </div>
  );
};

export default Banner;
