import React from 'react'
import {Dialog,DialogContent,DialogTitle,TableContainer,TableRow,TableCell,TableBody,Table } from '@mui/material'

const Detail = (props:any) =>{
	const {title,open,setOpen,data} = props
	return(
		<Dialog
			maxWidth ="sm"
			open={open}
			onClose={()=>setOpen(false)}
			aria-labelledby="confirm-dialog"
		>
			<DialogTitle id="confirm-dialog"> {title} </DialogTitle>
			<DialogContent>
				Title :-  {JSON.stringify(data.title)}<br/><br/>
				URL :-  {JSON.stringify(data.url)}<br/><br/>
				Created_at :-  {JSON.stringify(data.created_at)}<br/><br/>
				Author :-  {JSON.stringify(data.author)}
				
			</DialogContent>
		</Dialog>


	)
}
export default Detail