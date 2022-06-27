import React from 'react';
import Navbar from './components/Navbar';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './App.css';
import Home from './components/pages/Home';
import Aboutme from './components/pages/Aboutme';
import Resume from './components/pages/Resume';
import Footer from './components/Footer';

function App() {
  return (
    <>
    <Router>
      <Navbar />
     
      <Routes>
        <Route path='/' exact element={<Home />} />
        <Route path='/aboutme' element={<Aboutme />} />
        <Route path='/resume' element={<Resume />} />
        
      </Routes>
      </Router>

      </>
    
  );
}

export default App;
