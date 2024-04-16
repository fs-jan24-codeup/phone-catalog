import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './global.css';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="phones" element={<div>Phone page</div>} />
        </Route>
      </Routes>
    </Router> 
  </React.StrictMode>,
);