import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { getAllData, isLoading } from '../Redux/PostSlice';
//import { Container, Grid } from '@material-ui/core';
import {Paper,TableContainer,TableRow,TableCell,TableHead,TableBody,Pagination,Table} from "@mui/material";
import { addData, showPagination } from '../Redux/PostSlice';
import moment from "moment";

function Dashboard(props:any) {
    const dispatch = useDispatch();
    const [page, setPage] = useState(0);
    const data = useSelector(getAllData);
    const load = useSelector(isLoading);
    const [pageValue, setPageValue] = useState(0);

    useEffect(() => {
    axios.get(`https://hn.algolia.com/api/v1/search_by_date?tags=story&page=${page}`)
    .then((result) => {
        dispatch(addData(result.data));
        dispatch(showPagination());
    })
    .catch((error) => console.log(error));
    }, [page]);

    useEffect(() => {
        const interval = setTimeout(() => {
            setPage((prev) => prev + 1);

        }, 10000);
        if (page === 49) {
            clearTimeout(interval)
        }
    },[page]);
    const navigation = useNavigate();
    const handleClick = (id: number,val: any) => {
        navigation(`/Details/${id}`, {state: {val},});
    }

    const handleChange = (e: any, val: any) => {
        setPage(val);
        setPageValue(val - 1);
    };
    return (
        <>
    
    <Paper>
        <TableContainer>
            <Table stickyHeader aria-label = 'sticky table'>
                <TableHead >
                    <TableRow>
                        <TableCell>Created_at</TableCell>
                        <TableCell>Title</TableCell>
                        <TableCell>Author</TableCell>
                        <TableCell>URL</TableCell>
                    </TableRow>
                </TableHead>
            <TableBody>
            {data.slice(pageValue*20,pageValue*20 + 20)
            .map((val:any,index:number) =>{
                return <TableRow key={index} onClick={()=>handleClick(val.created_at_i, val)}>
                            <TableCell>{moment(val.created_at).format('LLLL')}</TableCell>
                            <TableCell>{val.title}</TableCell>
                            <TableCell>{val.author}</TableCell>
                            <TableCell>{val.url}TableCell</TableCell>
                        </TableRow>
                })

            }
            </TableBody>
        </Table>
        <Pagination
            count={page + 1}
            page={page}
            onChange={handleChange}
            style={{margin: '3rem', marginLeft: '50%'}}
            shape='rounded'
            variant='outlined'
            color='primary'
        />
        </TableContainer>
    </Paper>

</>

    )
}

export default Dashboard;
