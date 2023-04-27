import { renderToString } from 'react-dom/server';
import type { Store } from '@reduxjs/toolkit';
import { FC } from 'react';

interface IRenderReturn {
  renderedHtml: string,
  store?: Store,
}

interface IRender {
  (url: string | Partial<Location>): IRenderReturn
}

const GreetingHtml: FC = () => {
  return (
    <div>
      <h1>Привет :)</h1>
    </div>
  );
};

export const render: IRender = (url = '') => {
  console.log(url);
  const renderedHtml = renderToString(
    <GreetingHtml />
  );

  return {
    renderedHtml,
  };
};
