import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

// Direct rendering for web
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);