import { Link, Navigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../authContext";

export default function Login() {
    const [loginFormData, setLoginFormData] = useState({})
    const { currentUser } = useAuth()

    const handleFormInput = (name, text) => {
        setLoginFormData({...loginFormData, [name]: text})
    }

    const handleFormSubmit = async e => {
        e.preventDefault();
        await context.login(loginFormData.username, loginFormData.password)

    }

    return (
        localStorage.getItem("user_token") ? 
        <Navigate replace to="/" /> :
        <div className="login">
            <h1>Log in to start journaling</h1>

            <form onSubmit={handleFormSubmit}>
                <label>Username</label>
                <input type="text" onChange={e => handleFormInput("username", e.target.value)} />
                <label>Password</label>
                <input type="password" onChange={e => handleFormInput("password", e.target.value)} />
                <input type="submit" />
            </form>

            <span>Don't have an account? <Link to="/register">Create one</Link></span>
        </div> 
    )

}