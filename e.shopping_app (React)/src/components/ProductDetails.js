import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useHistory, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { removeSelectedProduct, selectedProduct } from '../redux/actions/productsAction';
import './product.css'
import { Container, Grid } from '@material-ui/core';

function ProductDetails() {
    const { productId } = useParams();
    const products = useSelector((state) => state.allProducts.products);
    const [selectedterm, setSelectedTerm] = useState(['']);
    let history = useHistory();
    
    const dispatch = useDispatch();
    const fetchProductDetail = async (id) => {
        const response = await axios
            .get(`http://localhost:3002/products/${id}`)
            .catch((err) => {
                console.log("err: ", err);
            });
            
        dispatch(selectedProduct(response.data));
        setSelectedTerm(response.data);
    };
    useEffect(() => {
        if (productId && productId !== "") fetchProductDetail(productId);
        return () => {
            dispatch(removeSelectedProduct());
        };
    }, [productId]);

    const handleRemove = () => {
        window.confirm("Are You sure want to Remove this data ?");
    }

    const handleEdit = () => {
        window.confirm("Are You sure want to Edit this data ?");
    }

    const handleBack = (e) => {
        e.preventDefault();
        history.push('/');
    }

    return (
        <Container className="box">
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
                        
                        <button className="btn btn-edit" type="button" onClick={handleEdit}>
                            <Link className="btn-edit" to={`/editproduct/${selectedterm.id}`}>Edit</Link>
                        </button>
                        
                        <button className="btn btn-danger mr-2" type="button" onClick={handleRemove}>
                            <Link className="btn-danger" to={`/trash/${selectedterm.id}`}>Remove</Link>
                        </button>
                    </Grid>
                </Grid>
            )}
            
        </Container>
    );
};

export default ProductDetails;
