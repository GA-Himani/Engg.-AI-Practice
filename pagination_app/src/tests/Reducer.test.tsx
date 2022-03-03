import store from '../Redux/Store'

import {addData} from '../Redux/Reducer'

test('should set the data' ,()=>{
	store.dispatch(
addData({
	hits:[{
		author:'quantisian',
		title:'find licenses',
		url:'https:"github.com',
		created_at: 1

	}]
})
		)

	let state = store.getState().data
	const question = state.data.find((val) => val.created_at === 1)
	expect(question?.author).toBe('quantisian')
	expect(question?.title).toBe('find licenses')
	expect(question?.url).toBe('https:"github.com')
})