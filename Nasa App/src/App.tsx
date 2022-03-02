import React from 'react';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import AsteroidSearch from './components/AsteroidSearch';
import AsteroidDetail from './components/AsteroidDetail';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <h2 style={{textAlign:'center'}}>Nasa Asteroid Detail App</h2>
      <Routes>
        <Route path='/' element={<AsteroidSearch />} />
        <Route path='/AsteroidDetail' element={<AsteroidDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;