import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import type { Store } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import App from './App';
import {store} from './store/';

interface IRenderReturn {
  renderedHtml: string,
  store?: Store,
}

interface IRender {
  (url: string | Partial<Location>): IRenderReturn
}

export const render: IRender = (url = '') => {
  const renderedHtml = renderToString(
    <Provider store={store}>
    <StaticRouter location={url}>
      <App />
    </StaticRouter>
    </Provider>
  );

  return {
    renderedHtml, store
  };
};
