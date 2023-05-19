import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore } from './store';
import App from './App';
import { registerServiceWorker } from './service-worker/register';
import { GameSocketContext, gameSocket } from './utils/socket/gameSocket';
import './index.css';

if (import.meta.env.MODE === 'production') {
  window.addEventListener('load', () => {
    registerServiceWorker();
  });
}

const initialState = window.initialState;

delete window.initialState;

const store = createStore(initialState);

ReactDOM.hydrateRoot(
  document.getElementById('root') as HTMLElement,
    <BrowserRouter>
      <Provider store={store}>
        <GameSocketContext.Provider value={gameSocket}>
          <App />
        </GameSocketContext.Provider>
      </Provider>
    </BrowserRouter>
);
