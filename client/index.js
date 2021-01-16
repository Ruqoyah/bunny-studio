import React from 'react';
import ReactDOM from 'react-dom';

import './public/styles/custom.css';
import './public/styles/index.css';
import App from './components/App';
import { setAuthorizationToken  } from './helper'

const token = localStorage.getItem('token');

if (token) {
  setAuthorizationToken(token);
}

ReactDOM.render(
    <App />,
  document.getElementById('app')
);
