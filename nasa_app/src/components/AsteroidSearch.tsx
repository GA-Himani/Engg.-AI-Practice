import React, { useState, useEffect } from 'react';
import { Box, Input, Button, CircularProgress, Alert, AlertTitle, InputBase } from '@mui/material';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom'
import axios from 'axios';
import {addData, fetchData} from '../Redux/Reducer';

const classes = {
	spinner: {
		marginLeft: '50%'
	},
	form: {
		margin: '2rem'
	},
	button: {
		marginLeft: '5rem'
	}
}
//
const AsteroidSearch :React.FC= () => {
	const dispatch = useDispatch();
	const data:any = useSelector(fetchData);
	const history = useNavigate();
	const [showSpinner, setShowSpinner] = useState(true);

	useEffect(()=> {
		axios.get(`https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=c06At11RPAoM2YhIDTR2UAOWCScda0MkbBeAsNkn`)
		.then((response) => {
			dispatch(addData(response.data))
			setShowSpinner(false)
		})
		.catch(error => console.log(error))
	},[])
	const [input, setInput] = useState('');
	const [showAlert, setShowAlert] = useState(false);
	const submitHandler = (e:React.FormEvent) => {
		e.preventDefault()
		data.near_earth_objects.forEach((val:any, index:number) => {
			if(val.id===input){
				history(
					'/AsteroidDetail',
					{state:val
				})
			}
			else{
				setShowAlert(true)
			}
		})
		setInput('')
	}

	useEffect(() => {
		setTimeout(() =>{
			setShowAlert(false)
		},5000)
	},[showAlert])
	
	const randomIdHandler = (e:React.FormEvent) => {
		const idArray = data.near_earth_objects
		const id = idArray[Math.floor(Math.random()*idArray.length)].id
		idArray.forEach((val:any, index:number) =>{
			if(val.id===id){
				setInput(id)
			}
		})
	}

    return (
    	<>
    		{
    			showAlert && 
    			<Alert severity='error'>
	    			<AlertTitle>Error</AlertTitle>
	    			This is an error Alert  Asteroid ID not found 
    			</Alert>
    		}
    		{
    			showSpinner ? <CircularProgress size={80} style={classes.spinner} /> :
    			<Box 
    				border={1}
    				borderColor='grey.500'
    				bgcolor='white.main'
    				borderRadius={5}
    				boxShadow={3}
    				width={400}
    				height={200}
    				mx="auto"
    				mt='2rem'
    				data-test='box'
			    >
			    	
			    	<form onSubmit={submitHandler} style={classes.form}>
			    		<InputBase
			    			type="text"
			    			data-testid="count"
			    			required
			    			className="form-control"
			    			placeholder="Enter Asteroid ID"
			    			onChange={(e:React.ChangeEvent<HTMLInputElement>) => setInput(e.target.value)}
			    			value={input}
			    		></InputBase>
			    		<Button
			    			data-testid="submit-button"
				            type="submit"
				            variant="contained"
				            color="primary"
				            disabled={input===""}
			    		>
			    			Submit
			    		</Button>
			    	</form>
			    	
			    	<Button
			    		data-testid="submit-button"
			            style={classes.button}
			            type="submit"
			            variant="contained"
			            color="primary"
			            onClick={randomIdHandler}
			    	>
			    		Random Asteroid
			    	</Button>
			    </Box>
    		}
		    
        </>
    )
}

export default AsteroidSearch;