import React, { useEffect } from 'react';
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import ProductComponent from './ProductComponent';
import setProducts from '../redux/actions/productsAction';
import './product.css'
import Header from './Header';

function ProductListing() {
    const products = useSelector((state) => state.allProducts.products);
    const dispatch = useDispatch();
    const fetchProducts = async () => {
        const response = await axios
            .get(`http://localhost:3002/products`)
            .catch((err) => {
                console.log("Err: ", err);
            });
            
        dispatch(setProducts(response.data));
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <div className="ui grid container">
            <Header />
            <ProductComponent />
        </div>
    )
}

export default ProductListing;
