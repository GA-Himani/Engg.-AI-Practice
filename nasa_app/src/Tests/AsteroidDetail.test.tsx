import React from 'react';
import AsteroidDetail from '../components/AsteroidDetail';
import {Provider} from 'react-redux';
import store from '../Redux/Store';
import {Router} from 'react-router-dom';
import ReactDom from 'react-dom';
import '@testing-library/jest-dom';
import {createMemoryHistory} from 'history';
import {render} from '@testing-library/react';

it('render location state', ()=>{
	const data ={
		val:{
			name:'433 eros',
			nasa_jpl_url: "http://jsd:ipl",
			is_potentially_hazardous_asteroid:false,
			id:2542100
		}
	}
	const {getByTestId} = render(
			<Provider store={store}>
				<AsteroidDetail/>
			</Provider>
	)
	getByTestId(`location`)
	expect('name:433 reos').toBe(`name:${data.val.name}`)
})
