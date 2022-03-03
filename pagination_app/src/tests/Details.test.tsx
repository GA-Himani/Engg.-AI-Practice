import React from 'react';
import Details from '../components/Details'
import {Provider} from 'react-redux'
import store from '../Redux/Store'
import ReactDOM from 'react-dom'
import {BrowserRouter} from 'react-router-dom'




describe('testing snapshot' , () => {
let container:HTMLDivElement;

beforeEach(()=>{
  container = document.createElement('div')
  document.body.appendChild(container)
  ReactDOM.render(
    <BrowserRouter>
    <Details />
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

