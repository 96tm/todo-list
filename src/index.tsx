import 'public/assets/css/base.scss';
import 'public/assets/css/normalize.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { store } from 'src/state/store';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router></Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
