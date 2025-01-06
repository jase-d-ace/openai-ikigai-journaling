import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Register from "../components/Register.jsx";

test("should render component", () => {
    render(<Register />);
    expect(screen.queryByText("Create an Account").toBeInTheDocument())
})