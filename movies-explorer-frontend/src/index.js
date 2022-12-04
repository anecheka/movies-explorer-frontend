import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './components/App/App';

// const isLoaded = () => {
//   window.addEventListener("load", (event) => {
//     console.log("page is fully loaded");
//     return true;
//   });
// }

ReactDOM.render(
  <BrowserRouter>
    <React.StrictMode>
      <App
      />
    </React.StrictMode>
  </BrowserRouter>,
  document.getElementById('root')
);