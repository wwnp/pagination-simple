import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
// import your route components too

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
      </Route>
    </Routes>
  </BrowserRouter>,
  document.getElementById('root')
);