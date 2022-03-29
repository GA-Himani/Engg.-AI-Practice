import React,{useState,ChangeEvent} from 'react'
import {fetchData,isLoad} from '../Redux/Reducer'
import {Paper,TableContainer,Table,TableBody,TableCell,TableRow,TableHead,Pagination,InputBase,Button} from '@mui/material'
import Detail from './ModalJson'
import {useSelector} from 'react-redux'
import moment from 'moment'
import {CircularProgress} from '@mui/material'
const classes = {
  button: {
    marginTop: "1rem",
    marginLeft: "9rem",
  },
  Input: {
    width: "25rem",
    marginBottom: "1rem",
    border: "2px solid grey"
  },
};


const PaginationTable = (props: any) => {
  const data = useSelector(fetchData);
  const load = useSelector(isLoad);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [dataForModal, setDataForModal]: any[] = useState([]);
  console.log(data);

  const [page, setPage] = useState(0);
  const [pageValue, setPageValue] = useState(0);

  const modalClickHandler = (id: number, val: any) => {
    setConfirmOpen(true);
    setDataForModal(val);
  };

  const [input, setInput] = useState("");
  const [showSearch, setShowSearch] = useState('');
  //const [filterData, setFilterData] = useState([]);
  const [pageForSearch, setPageForSearch] = useState(true);

  
  const changeHandler = (e: any, val: any) => {
    setPage(val);
    setPageValue(val - 1);
  };


  return (
    <div>
      <Detail
        data={dataForModal}
        title="Post RawJSON"
        open={confirmOpen}
        setOpen={setConfirmOpen}
      />
 {load ? <CircularProgress size ={80} style={{marginLeft:'50%'}} /> :
      <div style={{ height: 750 }}>
        
        <form   style={{margin:'1rem',display:'flex',justifyContent:'end'}}>
          <InputBase
            data-testid="search"
            style={classes.Input}
            placeholder="Search by Title or Created_at"
            type="text"
            required
            onChange={(e)=> setShowSearch(e.target.value)}
          ></InputBase>
         {/*<Button data-testid='submit-button'
            style={classes.button}
            type='submit'
            variant="contained"
            color="primary" >Search </Button> */}
        </form>
        <Paper>
          <TableContainer>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                 <TableCell>Created_at</TableCell>
                 <TableCell>Title</TableCell>
                 <TableCell>Author</TableCell>
                 <TableCell>URL</TableCell>
               
                </TableRow>
              </TableHead>
              <TableBody>

                {data.slice(pageValue * 20, pageValue * 20 + 20).filter((val: any) => {
                  if(showSearch === ''){
                        return (
                          <TableRow
                            key={val.created_at_i}
                            onClick={() =>
                              modalClickHandler(val.created_at_i, val)
                            }
                          >
                            <TableCell>{moment(val.created_at).format('LLLL')}</TableCell>
                            <TableCell>{val.title}</TableCell>
                            <TableCell>{val.author}</TableCell>
                            <TableCell>{val.url} </TableCell>
                          </TableRow>
                        );
                      }
                  else if(val.title.toLowerCase().trim().includes(showSearch.toLowerCase().trim()) ||
                        moment(val.created_at).format('LLLL').toLowerCase().trim().includes(showSearch.toLowerCase().trim())){
                        return(
                          <TableRow
                            key={val.created_at_i}
                            onClick={() =>
                              modalClickHandler(val.created_at_i, val)
                            }
                          >
                            <TableCell>{moment(val.created_at).format('LLLL')}</TableCell>
                            <TableCell>{val.title}</TableCell>
                            <TableCell>{val.author}</TableCell>
                            <TableCell>{val.url} </TableCell>
                          </TableRow>
                          )}
                    }
                      ).map((val: any, index: any) => {
                        return (
                          <TableRow
                            key={val.created_at_i}
                            onClick={() =>
                              modalClickHandler(val.created_at_i, val)
                            }
                          >
                            <TableCell>{ moment(val.created_at).format('LLLL')}</TableCell>
                            <TableCell>{val.title}</TableCell>
                            <TableCell>{val.author}</TableCell>
                            <TableCell>{val.url} </TableCell>
                          </TableRow>
                        );
                      })}
              </TableBody>
            </Table>

            {pageForSearch && (
              <Pagination
              style={{marginTop:'1rem',marginLeft:'30rem'}}
                count={ props.pageNumber + 1}
                page={page}
                onChange={changeHandler}
                variant="outlined"
                shape="rounded"
                color="primary"
              />
            )}
          </TableContainer>
        </Paper>
      </div>
}
    </div>
  );
};

export default PaginationTable;
