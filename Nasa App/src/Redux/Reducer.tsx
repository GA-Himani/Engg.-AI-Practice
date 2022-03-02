import {createSlice, PayloadAction} from '@reduxjs/toolkit';
interface Post{
	data:any[]
}

const AsteroidSlice = createSlice({
	name:'data',
	initialState:{
		data:[]
	},
	reducers:{
		addData:(state:any, action:PayloadAction<any>) => {
			state.data = action.payload
		}
	}
})

export const {addData} = AsteroidSlice.actions

export const fetchData = (state:any) => state.data.data

export default AsteroidSlice