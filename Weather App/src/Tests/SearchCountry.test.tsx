import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "../Redux/Store";
import React from "react";
import SearchCountry from '../Components/SearchCountry'
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";
import {fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';


describe("Home Component tests", () => {
  let container: HTMLDivElement;
  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
    ReactDOM.render(
      <React.StrictMode>
        <BrowserRouter>
          <Provider store={store}>
            <SearchCountry />
          </Provider>
        </BrowserRouter>
      </React.StrictMode>,
      container
    );
  });
  afterEach(() => {
    document.body.removeChild(container);
    container.remove();
  });
  it("Render correctly initial document", () => {
    expect(container).toMatchSnapshot();
  });
  it('Redirect to correct location', () => {
    const button = container.querySelectorAll('button');
    const loginButton = button[0];
    fireEvent.click(loginButton);
    expect(window.location.pathname).toEqual('/')
});

it('checking input in Component', () => {
  const inputs = container.querySelectorAll('input');
  expect(inputs).toHaveLength(1);
})

it('checking button in component', () => {
  const buttons = container.querySelectorAll('button');
  expect(buttons).toHaveLength(1);
})


it('Renders correctly initial document with data-test query', () => {
  expect(container.querySelector("[data-test='login-form']")).toBeInTheDocument();
  expect(container.querySelector("input")?.getAttribute('name'))
      .toBe('countryName');
});

});
