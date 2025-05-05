// index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import MainApp from './App'; // 👈 Import MainApp directly
import './App.css'; 

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <MainApp /> {/* 👈 Use MainApp directly */}
  </React.StrictMode>
);


