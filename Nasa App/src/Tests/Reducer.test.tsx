import store from '../Redux/Store';
import {addData} from '../Redux/Reducer';

test('shoudl set the data',()=>{
	store.dispatch(addData([{
		near_earth_objects:{
			name:'433 eros',
			nasa_jpl_url:"http://jsd:ipl",
			is_potentially_hazardous_asteroid:false,
			id:2542100
		}
	}]))
	let state:any= store.getState().data
	const value = state.data[0].near_earth_objects
	expect(value?.name).toBe('433 eros')
	expect(value?.nasa_jpl_url).toBe("http://jsd:ipl")
	expect(value?.is_potentially_hazardous_asteroid).toBe(false)
})