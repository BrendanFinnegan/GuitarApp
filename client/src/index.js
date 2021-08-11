import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import WebFont from 'webfontloader';
import { BrowserRouter as Router } from "react-router-dom";


WebFont.load({
  google: {
    families: ['Cinzel','Goldman', 'cursive','sans-serif', 'Reem Kufi']
  }
});

ReactDOM.render(
  <Router>
      <App />
  </Router>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
