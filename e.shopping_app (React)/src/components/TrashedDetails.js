import React, { useEffect, useState } from 'react';
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
//import ProductComponent from './ProductComponent';
import setProducts from '../redux/actions/productsAction';
import './product.css'
import { Button, Grid } from '@material-ui/core';
import { useHistory, Link } from 'react-router-dom';
import Search from '@material-ui/icons/Search';

function TrashedDetails() {
    const products = useSelector((state) => state.allProducts.products);
    const [searchterm, setSearchTerm] = useState('');
    const dispatch = useDispatch();
    let history = useHistory();

    const fetchProducts = async () => {
        const response = await axios
            .get(`http://localhost:3002/trashedproducts`)
            .catch((err) => {
                console.log("Err: ", err);
            });
            
        dispatch(setProducts(response.data));
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleRestore = () => {
        window.confirm("Are You sure want to Restore this data ?");
    }

    const handleRemove = () => {
        window.confirm("Are You sure want to Remove this data Permanently ?");
    }

    const handleBack = (e) => {
        e.preventDefault();
        history.push('/');
    }

    return (
        <div className="ui grid container">
            { <button onClick={handleBack} className="btn btn-back ">Back To Home</button> }
            <h2>Trashed Products</h2>
            <Grid>
                <Grid container spacing={2} >
                    <Grid item sm={8} className="search">
                        <input type='text' placeholder='Search Title' onChange={(e)=> setSearchTerm(e.target.value)} />
                        <Button><Search /></Button>
                    </Grid>
                    <Grid item sm={4}>
                        <button className="btn btn-add">
                            <Link className='btn mr-2' to={`/addproduct`}> Add Product</Link>
                        </button>
                    </Grid>
                </Grid>
                <Grid className="content">
                {products.filter((product, index)=> {
                    if(searchterm === '' ){
                        return (
                            <div className="product-box">
                                <div className="box-content mrg" key={product.id}>
                                    <Link to={`/product/${product.id}`}>
                                        <div>
                                            <div >
                                                <img src={product.image} alt={product.title} className="img" />
                                            </div>
                                            <div className='box-text'>
                                                <p >Title::  {product.title}</p>
                                                <p >Price::  $ {product.price}</p>
                                                <p >Category::  {product.category}</p>
                                            </div>
                                            
                                        </div>
                                    </Link>
                                    <div>
                                        <button className="btn btn-edit mr-2" type="button" onClick={handleRestore}>
                                            <Link className="btn-edit" to={`/restore/${product.id}`}>Restore</Link>
                                        </button>
                                        <button className="btn btn-danger mr-2" type="button" onClick={handleRemove}>
                                            <Link className="btn-danger" to={`/permanentremove/${product.id}`}>Remove</Link>
                                        </button>
                                    </div>
                                </div>
                            </div>    
                        )
                    }
                    else if (product.title.toLowerCase().includes(searchterm.toLocaleLowerCase())){
                        return (
                            <div className="product-box">
                                <div className="box-content mrg" key={product.id}>
                                    <Link to={`/product/${product.id}`}>
                                        <div>
                                            <div >
                                                <img src={product.image} alt={product.title} className="img" />
                                            </div>
                                            <div className='box-text'>
                                                <p >Title::  {product.title}</p>
                                                <p >Price::  $ {product.price}</p>
                                                <p >Category::  {product.category}</p>
                                            </div>
                                            
                                        </div>
                                    </Link>
                                    <div>
                                        <button className="btn btn-edit mr-2" type="button" onClick={handleRestore}>
                                            <Link className="btn-edit" to={`/restore/${product.id}`}>Restore</Link>
                                        </button>
                                        <button className="btn btn-danger mr-2" type="button" onClick={handleRemove}>
                                            <Link className="btn-danger" to={`/permanentremove/${product.id}`}>Remove</Link>
                                        </button>
                                    </div>
                                </div>
                            </div>    
                        )
                    }
                }).map((product)=> {
                    return (
                        <div className="product-box">
                            <div className="box-content mrg" key={product.id}>
                                <Link to={`/product/${product.id}`}>
                                    <div>
                                        <div >
                                            <img src={product.image} alt={product.title} className="img" />
                                        </div>
                                        <div className='box-text'>
                                            <p >Title::  {product.title}</p>
                                            <p >Price::  $ {product.price}</p>
                                            <p >Category::  {product.category}</p>
                                        </div>
                                        
                                    </div>
                                </Link>
                                <div>
                                    <button className="btn btn-edit mr-2" type="button" onClick={handleRestore}>
                                        <Link className="btn-edit" to={`/restore/${product.id}`}>Restore</Link>
                                    </button>
                                    <button className="btn btn-danger" type="button" onClick={handleRemove}>
                                        <Link className="btn-danger" to={`/permanentremove/${product.id}`}>Remove</Link>
                                    </button>
                                </div>
                            </div>
                        </div>    
                    )
                })}
                </Grid>
            </Grid>
        </div>
    )
}

export default TrashedDetails;
