import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import 'public/assets/css/normalize.scss';
import 'public/assets/css/base.scss';

ReactDOM.render(
  <React.StrictMode>
    <Router></Router>
  </React.StrictMode>,
  document.getElementById('root')
);
