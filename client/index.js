import React from 'react';
import ReactDOM from 'react-dom';

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
