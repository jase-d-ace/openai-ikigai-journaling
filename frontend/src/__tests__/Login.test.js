import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Login from "../components/Login.jsx";
import { AuthProvider } from "../authContext.jsx";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";

describe("<Login />", () => {

    beforeEach(() => {
        render(
            <AuthProvider>
                <BrowserRouter>
                    <Login />
                </BrowserRouter>
            </AuthProvider>
        );
    })

    it("should render component", () => {
        expect(screen.queryByText("Log in to start journaling")).toBeInTheDocument()
    })
    
    test("Correct credentials should log you in", async () => {
        // not committing actual credentials here
        userEvent.type(screen.getByPlaceholderText("Username"), "shhhh")
        userEvent.type(screen.getByPlaceholderText("Password"), "no peeking")
        await fireEvent.submit(screen.getByTestId("login-form"))
    
        await waitFor(() => expect(screen.queryByText("Log in to start journaling")).not.toBeInTheDocument());
    })
})