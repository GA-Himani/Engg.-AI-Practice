import React from 'react';
import {render, screen} from '@testing-library/react';
import AsteroidSearch from '../components/AsteroidSearch';
import {Provider} from 'react-redux';
import store from '../Redux/Store';
import {BrowserRouter} from 'react-router-dom';
import ReactDom from 'react-dom';

describe('check snapshot',() =>{
	let container:HTMLDivElement

	beforeEach(()=>{
		container= document.createElement('div')
		document.body.appendChild(container)
		ReactDom.render(
			<BrowserRouter>
				<Provider store={store}>
					<AsteroidSearch />
				</Provider>
			</BrowserRouter>,container)
	})

	afterEach(()=>{
		document.body.removeChild(container)
		container.remove()
	})
	it('render snapshot',()=>{
		expect(container).toMatchSnapshot()
	})
})
test('render async calling api', async()=>{
	render(
		<BrowserRouter>
			<Provider store={store}>
				<AsteroidSearch />
			</Provider>
		</BrowserRouter>
	)
	const element = await screen.getAllByRole('progressbar')
	expect(element).toHaveLength(1)
})
