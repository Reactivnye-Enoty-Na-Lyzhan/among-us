import React from 'react';
import './Banner.css';

interface BannerProps {
  outcome: 'gameStartedTraitor' | 'gameStartedInnocent' | 'gameEnded';
}

const Banner: React.FC<BannerProps> = ({ outcome }) => {
  let bannerText: string;
  let bannerSubText: string;
  let backgroundColor: string;

  switch (outcome) {
    case 'gameStartedTraitor':
      bannerText = 'Игра началась';
      bannerSubText = 'Ты играешь за предателя';
      backgroundColor = 'traitor';
      break;
    case 'gameStartedInnocent':
      bannerText = 'Игра началась';
      bannerSubText = 'Ты играешь за мирного';
      backgroundColor = 'innocent';
      break;
    case 'gameEnded':
      bannerText = 'Для тебя игра закончилась';
      bannerSubText = 'Вот так. Зря ты остался один';
      backgroundColor = 'end';
      break;
    default:
      bannerText = '';
      bannerSubText = '';
      backgroundColor = '';
  }

  return (
  <div className={`banner ${backgroundColor}`}>
      <div className="banner__wrapper">
      <p className='banner__text'>{bannerText}</p>
      <p className='banner__subtext'>{bannerSubText}</p>
      </div>
    </div>
  );
};

export default Banner;
