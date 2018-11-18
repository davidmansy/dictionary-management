import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducers';
import middelware from './middleware';
import { loadState, saveState } from './utils/localStorage';
import throttle from 'lodash.throttle';

const persistedState = loadState();
const store = createStore(reducer, persistedState, middelware);

store.subscribe(
  throttle(() => {
    saveState({
      dictionaries: store.getState().dictionaries
    });
  }, 1000)
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
