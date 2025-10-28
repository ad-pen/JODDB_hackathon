import React from 'react';
import ReactDOM from 'react-dom/client';
// 1. Import BrowserRouter
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Your styles
import './static/styles_task_starting.scss'; 
import './static/styles_header.scss';
// ... any other global styles

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* 2. Wrap your entire <App> component in <BrowserRouter> */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();