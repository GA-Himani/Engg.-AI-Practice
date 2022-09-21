import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useHistory, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { removeSelectedProduct, selectedProduct } from '../redux/actions/productsAction';
import './product.css'
import { Container, Grid } from '@material-ui/core';

function PermanentRemove() {
    const { productId } = useParams();
    const products = useSelector((state) => state.allProducts.products);
    const [selectedterm, setSelectedTerm] = useState(['']);
    let history = useHistory();
    
    const dispatch = useDispatch();
    const fetchProductDetail = async (id) => {
        const result = await axios.delete(`http://localhost:3002/trashedproducts/${id}`)
            .catch((err)=>{
                console.log("err: ",err)
            })
        history.push("/");
    };
    useEffect(() => {
        if (productId && productId !== "") fetchProductDetail(productId);
        return () => {
            dispatch(removeSelectedProduct());
        };
    }, [productId]);

    const handleRestore = () => {
        window.confirm("Are You sure want to Restore this data ?");
    }
   
    const handleBack = (e) => {
        e.preventDefault();
        history.push('/');
    }

    return (
        <Container className="box">
           { /* <h2>Trashed Product</h2>
           <button onClick={handleBack} className="btn btn-back ">Back To Home</button> 
            {selectedterm.length ? (
                 <div><br/><br/>No Data Found...</div>
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
                        
                        <button className="btn btn-edit" type="button"onClick={handleRestore}>
                            <Link to={`/restore/${selectedterm.id}`}>Restore</Link>
                        </button>
                        <button className="btn btn-danger" type="button" onClick={handleBack}>
                            Remove
                        </button>
                        
                    </Grid>
                </Grid>
            ) */}
            
        </Container>
    );
};

export default PermanentRemove;
