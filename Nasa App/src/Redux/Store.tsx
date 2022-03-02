import { configureStore } from '@reduxjs/toolkit';
import AsteroidSlice from "./Reducer"

export default configureStore({
	reducer : {
		data: AsteroidSlice.reducer
	}
})