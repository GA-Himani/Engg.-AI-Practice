import React from 'react';
import ReactDOM, { render } from 'react-dom';
import { act } from 'react-dom/test-utils';
import {BrowserRouter} from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../Redux/Store';
import { screen, cleanup, fireEvent } from '@testing-library/react';
import App from '../App'
import AsteroidSearch from '../components/AsteroidSearch';
import { InputBase } from '@mui/material';


let container: HTMLDivElement;

beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
});

afterEach(() => {
    document.body.removeChild(container);
});

it(' App component render', () => {
    act(() => {
        ReactDOM.render(<React.StrictMode>
            <Provider store={store}>
                <App />
            </Provider>
        </React.StrictMode>, container);
    });
    const HomeElement = screen.getByTestId('app-heading')
    expect(HomeElement).toBeInTheDocument();
    expect(HomeElement).toHaveTextContent("Nasa Asteroid Detail App");

});

test('test to check placeholder of search', () => {
   render(<div>
       <InputBase
            type="text"
            data-testid="count"
            required
            placeholder="Enter Asteroid ID"
        ></InputBase>
  </div>, container) 

   expect(screen.getByPlaceholderText("Enter Asteroid ID"))
})

