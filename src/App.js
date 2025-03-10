import React from 'react';
import Navbar from './components/Navbar';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './App.css';
import Home from './components/pages/Home';
import Aboutme from './components/pages/Aboutme';
import Games from './components/pages/Games';
import Wordle from './components/pages/Wordle';
import Connections from './components/pages/Connections';
import Sudoku from './components/pages/Sudoku';




function App() {
  return (
    <>
    <Router>
      <Navbar />
     
      <Routes>
        <Route path='/' exact element={<Home />} />
        <Route path='/aboutme' element={<Aboutme />} />
        <Route path='/games' element={<Games />} />
        <Route path='/wordle' element={<Wordle />} />
        <Route path='/connections' element={<Connections />} />
        <Route path='/sudoku' element={<Sudoku />} />
        
      </Routes>
      </Router>

      </>
    
  );
}

export default App;
