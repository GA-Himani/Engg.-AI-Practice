import React from 'react';
import { render, screen } from '@testing-library/react';
import Dashboard from '../components/Dashboard'
import {Provider} from 'react-redux'
import store from '../Redux/Store'
import ReactDOM from 'react-dom'
import {BrowserRouter} from 'react-router-dom'
test('renders created_at tableHead', () => {
  render(
<BrowserRouter>
<Provider store={store}>
    <Dashboard/>
  </Provider>
</BrowserRouter>
    );
  const linkElement = screen.getByText(/created_at/i);
  expect(linkElement).toBeInTheDocument();
});


describe('testing snapshot' , () => {
let container:HTMLDivElement;

beforeEach(()=>{
  container = document.createElement('div')
  document.body.appendChild(container)
  ReactDOM.render(
    <BrowserRouter>
    <Provider store={store}>
    <Dashboard/>
  </Provider>
</BrowserRouter>,container)
})
afterEach(()=>{
  document.body.removeChild(container)
  container.remove()
})

it('render correctly',() =>{
  expect(container).toMatchSnapshot()
})
})