import React from 'react';
import Navbar from './components/Navbar';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './App.css';
import Home from './components/pages/Home';
import Aboutme from './components/pages/Aboutme';
import Resume from './components/pages/Resume';
import Games from './components/pages/Games';
import Wordle from './components/pages/Wordle';


function App() {
  return (
    <>
    <Router>
      <Navbar />
     
      <Routes>
        <Route path='/' exact element={<Home />} />
        <Route path='/aboutme' element={<Aboutme />} />
        <Route path='/resume' element={<Resume />} />
        <Route path='/games' element={<Games />} />
        <Route path='/wordle' element={<Wordle />} />
        
      </Routes>
      </Router>

      </>
    
  );
}

export default App;
