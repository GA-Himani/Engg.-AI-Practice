import { createSlice,PayloadAction } from "@reduxjs/toolkit";

interface FetchApi {
  data: any[];
  weatherData : any[];
  showDetail: boolean;
  isLoading: boolean;
}

const SliceReducer: any = createSlice({
  name: "data",
  initialState: {
    data: [],
    weatherData : [],
    showDetail: false,
    isLoading: false,
  } as FetchApi,
  reducers: {
    addData: (state, action:PayloadAction<any>) => {
      state.data = action.payload;
    },
    addWeatherData :(state, action:PayloadAction<any>) => {
      state.data = action.payload;
    },
    showDetailReducer: (state) => {
      state.showDetail = true;
    },
    showLoading: (state) => {
      state.isLoading = true;
    },
    hideLoading: (state) => {
      state.isLoading = false;
    },
  },
});

export const { addData, showDetailReducer, showLoading, hideLoading,addWeatherData } =
  SliceReducer.actions;
export const fetchedData = (state: any) => state.data.data;
export const loading = (state: any) => state.data.isLoading;
export const toShow = (state: any) => state.data.showDetail;
export const weatherData = (state: any) => state.data.weatherData;
export default SliceReducer.reducer;
