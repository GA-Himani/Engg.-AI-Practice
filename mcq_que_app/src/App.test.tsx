import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import {Provider} from 'react-redux'
import store from './Redux/Store'
import ReactDOM from 'react-dom'

test('renders app component', () => {
  render(
    
      <Provider store={store} >
      <App />
       </Provider>
     
    );
  const linkElement = screen.getByText(/Online MCQ App/i);
  expect(linkElement).toBeInTheDocument();
});

describe('Login component tests', () => {
    let container: HTMLDivElement

    beforeEach(() => {
        container = document.createElement('div');
        document.body.appendChild(container);
        ReactDOM.render(
        <React.StrictMode>
            
            <Provider store={store} >
              <App />
              </Provider>
             
            </React.StrictMode>, container);
    })

    afterEach(() => {
        document.body.removeChild(container);
        container.remove();
    })
    it('check snapshot',()=>{
      expect(container).toMatchSnapshot();
    })

  })