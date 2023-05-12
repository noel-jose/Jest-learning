import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Login from "./Login";
import { __esModule } from "@testing-library/jest-dom/dist/matchers";

jest.mock("axios", () => ({
  __esModule: true,
  default: {
    get: () => ({
      data: { id: 1, name: "John" },
    }),
  },
}));

test("User input field is rendered", () => {
  render(<Login />);
  const userInputElement = screen.getByPlaceholderText(/username/i);
  expect(userInputElement).toBeInTheDocument();
});

test("Password input field is rendered", () => {
  render(<Login />);
  const passwordInputElement = screen.getByPlaceholderText(/password/i);
  expect(passwordInputElement).toBeInTheDocument();
});

test("Button is rendered", () => {
  render(<Login />);
  const buttonElement = screen.getByRole("button");
  expect(buttonElement).toBeInTheDocument();
});

test("User input field is empty", () => {
  render(<Login />);
  const userInputElement = screen.getByPlaceholderText(/username/i);
  expect(userInputElement.value).toBe("");
});

test("password input field is empty", () => {
  render(<Login />);
  const passwordInputElement = screen.getByPlaceholderText(/password/i);
  expect(passwordInputElement.value).toBe("");
});

test("Login button is disabled by default", () => {
  render(<Login />);
  const buttonEl = screen.getByRole("button");
  expect(buttonEl).toBeDisabled();
});

test("Error message should not be displayed by default", () => {
  render(<Login />);
  const spanElement = screen.getByTestId("error");
  expect(spanElement).not.toBeVisible();
});

test("Username input should change", () => {
  render(<Login />);
  const userInputElement = screen.getByPlaceholderText("username");
  const testValue = "test";

  fireEvent.change(userInputElement, { target: { value: testValue } });
  expect(userInputElement.value).toBe(testValue);
});

test("Password input should change", () => {
  render(<Login />);
  const passwordInputElement = screen.getByPlaceholderText("password");
  const testValue = "password";

  fireEvent.change(passwordInputElement, { target: { value: testValue } });
});

test("Button should not be disabled when there are inputs", () => {
  render(<Login />);
  const button = screen.getByRole("button");
  const userInputElement = screen.getByPlaceholderText("username");
  const passwordInputElement = screen.getByPlaceholderText("password");

  const testValue = "test";
  fireEvent.change(userInputElement, { target: { value: test } });
  fireEvent.change(passwordInputElement, { target: { value: testValue } });

  expect(button).not.toBeDisabled();
});

test("Loading should not be rendered", () => {
  render(<Login />);
  const button = screen.getByRole("button");
  expect(button).not.toHaveTextContent(/please wait/i);
});

test("Loading should be rendered after click", () => {
  render(<Login />);
  const button = screen.getByRole("button");
  const userInputElement = screen.getByPlaceholderText("username");
  const passwordInputElement = screen.getByPlaceholderText("password");

  const testValue = "test";
  fireEvent.change(userInputElement, { target: { value: test } });
  fireEvent.change(passwordInputElement, { target: { value: testValue } });

  expect(button).toHaveTextContent(/login/i);
});

test("Loading should not be visible after fetching", async () => {
  render(<Login />);
  const button = screen.getByRole("button");
  const userInputElement = screen.getByPlaceholderText("username");
  const passwordInputElement = screen.getByPlaceholderText("password");

  const testValue = "test";
  fireEvent.change(userInputElement, { target: { value: test } });
  fireEvent.change(passwordInputElement, { target: { value: testValue } });
  fireEvent.click(button);
  await waitFor(() => expect(button).not.toHaveTextContent(/please wait/i));
});

test("User should be visible after fetching", async () => {
  render(<Login />);
  const button = screen.getByRole("button");
  const userInputElement = screen.getByPlaceholderText("username");
  const passwordInputElement = screen.getByPlaceholderText("password");

  const testValue = "test";
  fireEvent.change(userInputElement, { target: { value: test } });
  fireEvent.change(passwordInputElement, { target: { value: testValue } });
  fireEvent.click(button);

  const userItem = await screen.findByText("John");

  expect(userItem).toBeInTheDocument();
});
