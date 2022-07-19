import { render as newRender, fireEvent } from "@testing-library/react";
import Home from "./components/Home";
import ParkingSpaces from "./components/ParkingSpaces";
import { MemoryRouter } from "react-router-dom";
import * as react from "react";

jest.mock("react-router-dom", () => ({
	...jest.requireActual("react-router-dom"),
	useParams: () => ({
		noOfSpaces: 1,
	}),
	useRouteMatch: () => ({ url: "parkingSpaces1" }),
}));

const render = (component: any) =>
	newRender(<MemoryRouter>{component}</MemoryRouter>);

const renderApp = () => render(<Home />);
const renderApp1 = () => render(<ParkingSpaces />);

test("test to check placeholder of inputField", () => {
	const { getByTestId } = renderApp();
	expect(getByTestId("parking-create-text-input")).toHaveTextContent(
		"Enter the number of spaces"
	);
});
test("test to check submit button", () => {
	const { getByTestId } = renderApp();
	expect(getByTestId("parking-create-submit-button")).toHaveTextContent(
		"submit"
	);
});
test("test to check no of spaces availble", () => {
	const { getAllByTestId } = renderApp1();
	const spaces: any = getAllByTestId("parking-drawing-space");
	expect(spaces).toHaveLength(1);
});
test("test to check childNodes of parking space 1", () => {
	const { getByTestId } = renderApp1();
	const spaces: any = getByTestId("parking-drawing-space-parkingSpace1");
	expect(spaces.childNodes).toHaveLength(1);
});
test("test to check childNodes of register space 1", async () => {
	const { getByTestId } = renderApp1();
	const button: any = getByTestId("register-button");
	await fireEvent.click(button);
	const registerButton: any = getByTestId("registertion-submit-button");
	await fireEvent.click(registerButton);
	const spaces: any = getByTestId("parking-drawing-registered-parkingSpace1");
	expect(spaces.childNodes).toHaveLength(3);
});
