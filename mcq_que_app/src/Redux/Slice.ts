import {createSlice,PayloadAction} from '@reduxjs/toolkit'

 interface Post{
	questionList:any[]
}

const OnlineMcqSlice = createSlice({
	name:'data',
	initialState:{
		questionList:[],
	} as Post,
	reducers:{
     addData : (state :any,action:PayloadAction<any>) =>{
     	state.questionList = action.payload
     },
	 isAnswered : (state :any,action:PayloadAction<any>) =>{
		 state.questionList[action.payload].isAnswer = true
		
	 },
	 fifthAnswer : (state :any,action:PayloadAction<any>) =>{
		state.questionList[4].isAnswer = false
	   
	},
	 addAnswer : (state :any,action:PayloadAction<any>) =>{
		state.questionList[action.payload.id].answerValue = action.payload.value  
	 },
	 addMultiOption : (state :any,action:PayloadAction<any>) =>{
		state.questionList[4].answerValue = action.payload
	 },
	}
})

export const {addData,isAnswered,addAnswer,addMultiOption,fifthAnswer} = OnlineMcqSlice.actions

export const fetchData = (state:any) => state.data.questionList

export default OnlineMcqSlice.reducer