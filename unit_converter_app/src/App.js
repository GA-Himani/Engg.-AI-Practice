import { Container, Box } from '@material-ui/core';
import React from 'react';
import './App.css'
import CreateInput from './components/CreateInput';


const App = () => {
    return(
      <Container maxWidth="lg" className="App">
        <Box sx={{ my: 4 }}>
          <h1> Unit Converter </h1>
          <CreateInput />
        </Box>
      </Container>
    );
}

export default App;
