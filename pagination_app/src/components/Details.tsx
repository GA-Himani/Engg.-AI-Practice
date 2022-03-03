import  React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router';
import {Paper,TableContainer,TableRow,TableCell,TableBody,Table} from "@mui/material";

const Details =() => {
    const [rawData, setRawData] = useState([]);
    const location = useLocation();
    //console.log(location);

    useEffect(() => {
        setRawData(location.state)
        //console.log(location.state)
        //console.log(location.state.val)
        //title, url, created_at, author
    })
    return (
    	<div data-test='component-app'>
    		<h1> Detail of Data </h1>
    		<Paper>
		        <TableContainer>
		            <Table stickyHeader aria-label = 'sticky table'>
		            <TableBody>
		            <TableRow>
                        <TableCell><h3>Title :- </h3></TableCell>
                        <TableCell>{JSON.stringify(location.state.val.title)}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell><h3>URL :- </h3></TableCell>
                        <TableCell>{JSON.stringify(location.state.val.url)}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell><h3>Created_at :- </h3></TableCell>
                        <TableCell>{JSON.stringify(location.state.val.created_at)}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell><h3>Author :- </h3></TableCell>
                        <TableCell>{JSON.stringify(location.state.val.author)}</TableCell>
                    </TableRow>
		            </TableBody>
		        </Table>
		        </TableContainer>
		    </Paper>
	   	</div>
         
    )
}

export default Details;
