import {configureStore} from '@reduxjs/toolkit'
import OnlineMcqSlice from './Reducer'
export default configureStore({
	reducer:{
		data:OnlineMcqSlice
	}
})