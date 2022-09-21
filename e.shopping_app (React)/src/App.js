import React from 'react';
import { Container, Grid } from '@material-ui/core';
import './App.css';
import{ BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from './components/Header';
import ProductListing from './components/ProductListing';
import ProductDetails from './components/ProductDetails';
import AddProduct from './components/AddProduct';
import EditProduct from './components/EditProduct';
import Trash from './components/Trash';
import TrashedDetails from './components/TrashedDetails';
import Restore from './components/Restore';
import PermanentRemove from './components/PermanentRemove';

function App() {
  return (
    <Container className="App">
      <Grid>
        <Router>
          <h1>Product Management</h1>
          <Switch>
            <Route path="/" exact component={ProductListing} />
            <Route path="/product/:productId" component={ProductDetails} />
            <Route path="/addproduct" exact component={AddProduct} />
            <Route path="/editproduct/:id" exact component={EditProduct} />
            <Route path="/trash/:productId" exact component={Trash} />
            <Route path="/restore/:productId" exact component={Restore} />
            <Route path="/trash" exact component={TrashedDetails} />
            <Route path="/permanentremove/:productId" exact component={PermanentRemove} />
            <Route>404 Not Found !</Route>
          </Switch>
        </Router>
        
      </Grid>
    </Container>
  );
}

export default App;
