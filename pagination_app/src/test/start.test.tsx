import React from 'react';
import App from "../App";
import { render } from "react-dom";
import { Provider } from 'react-redux';
import store from '../Redux/Store';
import { act } from 'react-dom/test-utils';
import ReactDOM from 'react-dom';
import { screen } from '@testing-library/react';
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
    const HomeElement = screen.getByTestId('home-heading')
    expect(HomeElement).toBeInTheDocument();
});
