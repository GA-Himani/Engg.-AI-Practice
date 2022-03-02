import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import {Provider} from 'react-redux';
import store from './Redux/Store';
import {BrowserRouter} from 'react-router-dom';
import ReactDom from 'react-dom';

test('renders learn react link', () => {
  render(
  	<BrowserRouter>
  		<Provider store={store}>
  			<App />
  		</Provider>
  	</BrowserRouter>
  	
  );
  const linkElement = screen.getByText(/Nasa Asteroid Detail App/i);
  expect(linkElement).toBeInTheDocument();
});

describe('check snapshot',()=>{
	let container:HTMLDivElement

	beforeEach(()=>{
		container= document.createElement('div')
		document.body.appendChild(container)
		ReactDom.render(
			<BrowserRouter>
				<Provider store={store}>
					<App />
				</Provider>
			</BrowserRouter>,container
			)
	})
	afterEach(()=>{
		document.body.removeChild(container)
		container.remove()
	})
	it('render snapshot', ()=>{
		expect(container).toMatchSnapshot()
	})
})
