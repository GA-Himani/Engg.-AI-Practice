import React, { useState, useEffect } from 'react';
import { Container, Grid, Button, Select } from '@material-ui/core';
import axios from 'axios';
import {useHistory, useParams} from 'react-router-dom';
import './product.css'


function EditProduct() {
    console.log('AddUser Page');
    const [entryForm, setEntryForm] = useState({
        title:'',
        price:'',
        description:'',
        category:'',
        image:'',
    
    });
    const [records, setRecords] = useState([]);
    let history = useHistory();
    const {id} = useParams();

    const handleInputChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setEntryForm({...entryForm, [name] : value });

    }
    useEffect(()=>{
        loadUser()
    }, []);
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const newEntry = { ...entryForm};
        console.log(newEntry);
        
        if (newEntry.title == '' || newEntry.price == '' || newEntry.stock == '' || newEntry.description == ''
            || newEntry.category == '' || newEntry.image == ''){
                alert("Form Inputs are must be filled with valid value !");
        }
        else{
            setRecords([...records, newEntry]);
            await axios.post("http://localhost:3002/products", newEntry );
            history.push('/');
            setEntryForm({title:'',price:'',description:'',category:'',image:''});
        }
        
    }
    const loadUser = async () => {
        const result = await axios.get(`http://localhost:3002/products/${id}`);
        console.log(result);
        setEntryForm(result.data);
    }
    
    const handleBack = (e) => {
        e.preventDefault();
        history.push('/');
    }
    
    return (
        <Container maxWidth='sm' >
            <Grid >
                <Grid>
                    { <button onClick={handleBack} className="btn btn-back ">Back To Home</button> }
                </Grid>
                <Grid>
                    <h1>Edit Product</h1>
                    <form className='Form'>
                        <div>
                        <label>Enter Title of Product : </label>
                        <input type='text' autoCapitalize='off' name='title' 
                            value={entryForm.title} placeholder='Enter Title' 
                            onChange={handleInputChange} 
                        /></div>
                        <div>
                        <label>Enter Category of Product : </label>
                        <Select native
                            name="category"
                            value={entryForm.category}
                            onChange={handleInputChange}>
                            <option>
                                Men_clothing
                            </option>
                            <option>
                                Jewelery
                            </option>
                            <option>
                                Electronics
                            </option>
                            <option>
                                Women_clothing
                            </option>
                        </Select>
                        </div>
                        <div>
                        <label>Enter Description of Product : </label>
                        <input type='text' autoCapitalize='off' name='description' 
                            value={entryForm.description} placeholder='Enter Description' 
                            onChange={handleInputChange} 
                        /></div>
                        <div>
                        <label>Enter Image URL of Product : </label>
                        <input type='text' autoCapitalize='off' name='image' 
                            value={entryForm.image} placeholder='Add Image URL' 
                            onChange={handleInputChange} 
                        /></div>
                        <div>
                        <label>Enter Price of Product : </label>
                        <input type='number' autoCapitalize='off' name='price' 
                            value={entryForm.price} placeholder='Enter Price' 
                            onChange={handleInputChange} 
                        /></div>
                        <div>
                            <Button onClick={handleSubmit} variant="contained" color='primary'> Edit </Button>
                        </div>
                    </form>
                </Grid>
            </Grid>
            
            
        </Container>
    )
}

export default EditProduct;
