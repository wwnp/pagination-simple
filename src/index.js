import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Home from './containers/Home';
import Test from './containers/Test';
import { Notfound } from './containers/Notfound';

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Home/>}></Route>
        <Route path='test/:name' element={<Test/>}></Route>
        <Route path='*' element={<Notfound/>}></Route>
      </Route>
    </Routes>
  </BrowserRouter>,
  document.getElementById('root')
);