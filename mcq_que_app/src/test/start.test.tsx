import React from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import { Provider } from 'react-redux';
import store from '../Redux/Store';
import App from '../App'
import { screen } from '@testing-library/react';

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
    const HomeElement = screen.getByTestId('testHome')
    expect(HomeElement).toBeInTheDocument();

});


it('render submit button test', () => {
    act(() => {
        ReactDOM.render(<React.StrictMode>
            <Provider store={store}>
                <App />
            </Provider>
        </React.StrictMode>, container);
    });
    expect(screen.getByTestId("submit-button")).toHaveAttribute("type", "submit");

});