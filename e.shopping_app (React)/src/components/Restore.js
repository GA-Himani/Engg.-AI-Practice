import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useHistory, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { removeSelectedProduct, selectedProduct } from '../redux/actions/productsAction';
import './product.css'
import { Container, Grid } from '@material-ui/core';

function Restore() {
    const { productId } = useParams();
    const products = useSelector((state) => state.allProducts.products);
    const [selectedterm, setSelectedTerm] = useState(['']);
    
    let history = useHistory();
    
    const dispatch = useDispatch();
    const restoreProductDetail = async (id) => {
        const response = await axios
            .get(`http://localhost:3002/trashedproducts/${id}`)
            .catch((err) => {
                console.log("err: ", err);
            });
            
        dispatch(selectedProduct(response.data))
        setSelectedTerm(response.data);
        const trashed = await axios.post(`http://localhost:3002/products`,response.data)
            .catch((err)=>{
                console.log("err: ",err);
            })
            
        dispatch(selectedProduct(response.data));
        setSelectedTerm(response.data);
        const result = await axios.delete(`http://localhost:3002/trashedproducts/${id}`)
            .catch((err)=>{
                console.log("err: ",err)
            })
        history.push("/");
    };
    useEffect(() => {
        if (productId && productId !== "") restoreProductDetail(productId);
        return () => {
            dispatch(removeSelectedProduct());
        };
    }, [productId]);
   
    const handleBack = (e) => {
        e.preventDefault();
        history.push('/');
    }

    return (
        <Container className="box">
            <h2>Trashed Product</h2>
           { <button onClick={handleBack} className="btn btn-back ">Back To Home</button> }
            {(selectedterm).length === 0 ? (
                <div>...Loading</div>
            ) : (
                <Grid container spacing={2} >
                    <Grid item xs={4}>
                        <img src={selectedterm.image} alt='' className="img" />
                    </Grid>
                    <Grid item xs={8}>
                        <h1>{selectedterm.title}</h1>
                        <h2>
                            Price::  ${selectedterm.price}
                        </h2>
                        <h3 >Category::  {selectedterm.category}</h3>
                        <p>Description::  {selectedterm.description}</p>
                        
                        <button className="btn btn-edit" >
                            Restore
                        </button>
                        <Link to={`/trash/${selectedterm.id}`}>
                            <button className="btn btn-danger">Remove</button>
                        </Link>
                    </Grid>
                </Grid>
            )}
            
        </Container>
    );
};

export default Restore;
