import { createSlice } from '@reduxjs/toolkit';

interface FetchApi {
	data: any[];
	showDetail: boolean;
}

const SliceReducer = createSlice({
	name: "data",
	initialState: {
		data: [],
		showDetail: false,
	} as FetchApi,
	reducers: {
		addData: (state, action) => {
			state.data = action.payload
		},

		showDetailReducer: (state) => {
			state.showDetail = true;
		}
	},
});

export const { addData, showDetailReducer } = SliceReducer.actions;

export const fetchData = (state: any) => state.data.data;

export const toShow = (state: any) => state.data.showDetail;

export default SliceReducer.reducer;