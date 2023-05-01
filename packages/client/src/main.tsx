import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from './App';
import { registerServiceWorker } from './service-worker/register';
import './index.css';
import { createStore } from './store';

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
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
