import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import type { Store } from '@reduxjs/toolkit';
import { LandingPage } from './components/LandingPage/_Component/LandingPage';

interface IRenderReturn {
  renderedHtml: string,
  store?: Store,
}

interface IRender {
  (url: string | Partial<Location>): IRenderReturn
}

export const render: IRender = (url = '') => {
  // Здесь сконфигурировать store
  /* const store = configureStore({...}) */

  const renderedHtml = renderToString(
    // Обернуть в Provider store
    // Убрать LandingPage и добавить вместо него App
    <StaticRouter location={url}>
      <LandingPage />
    </StaticRouter>
  );

  return {
    renderedHtml,
  };
};
