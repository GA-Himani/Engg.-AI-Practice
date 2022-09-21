import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './product.css';
import { Container, Grid, Button } from '@material-ui/core';
import Search from '@material-ui/icons/Search';


function ProductComponent() {
    const products = useSelector((state) => state.allProducts.products);
    const [searchterm, setSearchTerm] = useState('');
    
    const handleRemove = () => {
        window.confirm("Are You sure want to Remove this data ?");
    }

    const handleEdit = () => {
        window.confirm("Are You sure want to Edit this data ?");
    }
    
    return (
        <Container>
            <Grid>
                <Grid container spacing={2} >
                    
                    <Grid item sm={8} className="search">
                        <input type='text' placeholder='Search Title' onChange={(e)=> setSearchTerm(e.target.value)} />
                        <Button><Search /></Button>
                    </Grid>
                    <Grid item sm={4}>
                        <button className="btn btn-add" type="button">
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
                                                <p >Stock::  {product.stock}</p>
                                            </div>
                                            
                                        </div>
                                    </Link>
                                    <div>
                                        <Link to={`/product/${product.id}`}>
                                            <button className="btn btn-success" type="button">View</button>
                                        </Link>
                                        
                                        <button className="btn btn-edit" type="button" onClick={handleEdit}>
                                            <Link className="btn-edit" to={`/editproduct/${product.id}`}>Edit</Link>
                                        </button>
                                        
                                        <button className="btn btn-danger mr-2" type="button" onClick={handleRemove}>
                                            <Link className="mr-2" to={`/trash/${product.id}`}>Remove</Link>
                                        </button>
                                    </div>
                                </div>
                            </div>    
                        )
                    }
                    
                    else if ((product.title.toLowerCase().includes(searchterm.toLocaleLowerCase()))){
                        return (
                            console.log("category"),
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
                                                <p >Stock::  {product.stock}</p>
                                            </div>
                                            
                                        </div>
                                    </Link>
                                    <div>
                                        <Link to={`/product/${product.id}`}>
                                            <button className="btn btn-success" type="button">View</button>
                                        </Link>
                                        <button className="btn btn-edit" type="button" onClick={handleEdit}>
                                            <Link className="btn-edit" to={`/editproduct/${product.id}`}>Edit</Link>
                                        </button>
                                        <button className="btn btn-danger mr-2" type="button" onClick={handleRemove}>
                                            <Link to={`/trash/${product.id}`}>Remove</Link>
                                        </button>
                                    </div>
                                </div>
                            </div>    
                        )
                        }
                    }
                    ).map((product)=> {
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
                                                <p >Stock::  {product.stock}</p>
                                            </div>
                                            
                                        </div>
                                    </Link>
                                    <div>
                                        <Link to={`/product/${product.id}`}>
                                                <button className="btn btn-success" type="button">View</button>
                                            </Link>
                                        <button className="btn btn-edit" type="button" onClick={handleEdit}>
                                            <Link className="btn-edit" to={`/editproduct/${product.id}`}>Edit</Link>
                                        </button>
                                        
                                        <button className="btn btn-danger mr-2" type="button" onClick={handleRemove}>
                                            <Link className="btn-danger" to={`/trash/${product.id}`}>Remove</Link>
                                        </button>
                                        
                                    </div>
                                </div>
                            </div>    
                        )
                    })}
                </Grid>
            </Grid>
        </Container>
    )
};

export default ProductComponent;