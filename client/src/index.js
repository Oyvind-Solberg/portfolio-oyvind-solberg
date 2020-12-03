import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import * as firebase from './firebase/index';

import App from './App';
import configurePortfolioStore from './store/portfolio-store';

configurePortfolioStore();
// firebase.initialize();

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
