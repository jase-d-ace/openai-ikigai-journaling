import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Register from "../components/Register.jsx";
import { AuthProvider } from "../authContext.jsx";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";

describe("<Register />", () => {

    beforeEach(() => {
        render(
            <AuthProvider>
                <BrowserRouter>
                    <Register />
                </BrowserRouter>
            </AuthProvider>
        );
    })

    it("should render component", () => {
        expect(screen.queryByText("Create an Account")).toBeInTheDocument()
    })

    it("should not pass without same password", async () => {

    userEvent.type(screen.getByPlaceholderText("Username"), "example")
    userEvent.type(screen.getByPlaceholderText("Password"), "j");
    userEvent.type(screen.getByPlaceholderText("Confirm"), "s");
    await fireEvent.submit(screen.getByTestId("registration-form"));

    await waitFor(() => expect(screen.getByText("Already have an account?")).toBeInTheDocument());
    })
})