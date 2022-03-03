import { createSlice } from '@reduxjs/toolkit';

interface Post {
    data: any[]
    isLoading: boolean
}

interface Action {
    payload: any
}

const resultSlice = createSlice({
    name: 'data',
    initialState: {
        data: [],
        isLoading: false,
    } as Post,
    reducers: {
        addData: (state, action:Action) => {
            return {
                ...state,
                data:state.data.concat(action.payload.hits)
            }
        },
        hidePagination: (state) => {
            state.isLoading = false
        },
        showPagination: (state) => {
            state.isLoading = true
        },
    },
});

export const { addData, showPagination, hidePagination } = resultSlice.actions;
export const getAllData = (state: any) => state.data.data;
export const isLoading = (state: any) => state.data.isLoading;

export default resultSlice;
