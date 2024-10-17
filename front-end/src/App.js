// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './Navigation';
import Home from './Home';
import About from './About';
import Contact from './Contact';
import Login from './Login'
import Signup from './Signup';

import ExcelToBarGraph from './ExcelToBarGraph';
import { BarChart } from 'recharts';

const App = () => {
  return (
    <Router>
      <ExcelToBarGraph/>
      <Navigation/>
      <BarChart/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/home ' element={<Home/>}/>
          <Route path='/about' element={<About/>}/>
          <Route path='/Contact' element={<Contact/>}/>
          <Route path='/Signup' element={<Signup/>}/>
          <Route path='/Login'element={<Login/>}/>
        </Routes>
    </Router>
  );
};

export default App;
