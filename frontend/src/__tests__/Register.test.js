import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Register from "../components/Register.jsx";
import { AuthProvider } from "../authContext.jsx";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";

test("should render component", async () => {
    render(
        <AuthProvider>
            <BrowserRouter>
                <Register />
            </BrowserRouter>
        </AuthProvider>
    );
    
    expect(screen.queryByText("Create an Account")).toBeInTheDocument()
})