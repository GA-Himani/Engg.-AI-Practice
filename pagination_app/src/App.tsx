import React,{useState,useEffect} from 'react';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Dashboard from './components/Dashboard'
import axios from 'axios'
import {useDispatch} from 'react-redux'
import {addData,showLoading} from './Redux/Reducer'

function App() {

  const dispatch = useDispatch()
  const [page,setPage] = useState(0)
  useEffect(()=>{
    axios.get(`https://hn.algolia.com/api/v1/search_by_date?tags=story&page=${page}`)
    .then((response)=>{
      dispatch(addData(response.data))
      dispatch(showLoading())
    })
    .catch(error => console.log(error))
  },[page])

  useEffect(()=>{
    const interval = setTimeout(()=>{
      setPage(prev=> prev+1)
    },10000)
    if(page === 49){
      clearTimeout(interval)
    }
  })

    return (
      <BrowserRouter>
        <h2 style={{textAlign:'center'}} data-testid="home-heading" > Pagination App </h2>
       <Routes>
       <Route  path='/' element={<Dashboard pageNumber={page}/>}  />
       </Routes>
      </BrowserRouter>
    );
}

export default App;