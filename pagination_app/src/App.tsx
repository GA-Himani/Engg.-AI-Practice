import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { Container } from '@material-ui/core';
import './App.css';
import Dashboard from './components/Dashboard';
import Details from './components/Details';

function App() {
  
  

  return (
    <Container className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/Details/:id" element={<Details />} />
        </Routes>
      </Router>
    </Container>
  );
}

export default App;
