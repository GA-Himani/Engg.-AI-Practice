import {BrowserRouter} from 'react-router-dom'
import StartPage from '../Components/StartPage'
import * as ReactDOM from 'react-dom';
import React from 'react';
import {Provider} from 'react-redux'
import store from '../Redux/Store'
import {fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';



describe('Login component tests', () => {
    let container: HTMLDivElement

    beforeEach(() => {
        container = document.createElement('div');
        document.body.appendChild(container);
        ReactDOM.render(
        <React.StrictMode>
            <BrowserRouter  >
            <Provider store={store} >
              <StartPage />
              </Provider>
              </BrowserRouter>
            </React.StrictMode>, container);
    })

    afterEach(() => {
        document.body.removeChild(container);
        container.remove();
    })
    it('checking input in Component', () => {
        const inputs = container.querySelectorAll('input');
        expect(inputs).toHaveLength(3);
    })
    it('checking button in component', () => {
        const buttons = container.querySelectorAll('button');
        expect(buttons).toHaveLength(1);
        const label = container.querySelector('label');
        expect(label).toBeInTheDocument();
    })


    it('Renders correctly initial document with data-test query', () => {
        expect(container.querySelector("[data-test='login-form']")).toBeInTheDocument();
        expect(container.querySelector("input")?.getAttribute('name'))
            .toBe('username');
    });


   
    it("Render correctly initial document", () => {
        expect(container).toMatchSnapshot();
      });
})

