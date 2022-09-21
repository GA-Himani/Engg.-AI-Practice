import { Container, Box } from '@material-ui/core';
import React from 'react';
import './App.css'
import InputKeys from './components/InputKeys';
//import OutputKeys from './components/OutputKeys'

const App = () => {
    return(
      <Container maxWidth="lg" className="App">
        <Box sx={{ my: 4 }}>
          <h1> Calculator </h1>
          <InputKeys />
        </Box>
      </Container>
    );
}

export default App;
