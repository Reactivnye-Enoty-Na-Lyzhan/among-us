import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import App from './App';
import { StaticRouter } from 'react-router-dom/server';
import { TypeRootState, createStore } from './store/';
import { GameSocketContext, gameSocket } from './utils/socket/gameSocket';

interface IRenderReturn {
  renderedHtml: string;
  initialState: TypeRootState;
}

interface IRender {
  (url: string | Partial<Location>): IRenderReturn;
}

export const render: IRender = (url = '') => {
  const store = createStore();
  const initialState = store.getState();
  const renderedHtml = renderToString(
    <StaticRouter location={url}>
      <Provider store={store}>
        <GameSocketContext.Provider value={gameSocket}>
          <App />
        </GameSocketContext.Provider>
      </Provider>
    </StaticRouter >
  );

  return {
    renderedHtml,
    initialState,
  };
};
