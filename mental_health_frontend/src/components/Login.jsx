import { Link, Navigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../authContext";
import "../App.css";

export default function Login() {
    const [submitted, setSubmitted] = useState(false)
    const [loginFormData, setLoginFormData] = useState({
        username: "",
        password: "",
    })
    const { currentUser, login } = useAuth()

    const handleFormInput = (name, text) => {
        setLoginFormData({...loginFormData, [name]: text})
    }

    const handleFormSubmit = async e => {
        e.preventDefault();
        await login(loginFormData.username, loginFormData.password);
        setSubmitted(true);
    }

    return (
        currentUser.isLoggedIn ? 
        <Navigate replace to="/" /> :
        <div className="login">
            <header>
                <h2>Log in to start journaling</h2>
            </header>
            
            {submitted && <span className="error">{currentUser.error}</span>}

            <form className="login-form" onSubmit={handleFormSubmit}>
                <div className="field username-field">
                    <label>Username</label>
                    <input className="login-text-input" type="text" onChange={e => handleFormInput("username", e.target.value)} />
                </div>
                <div className="field password-field">
                    <label>Password</label>
                    <input className="login-text-input" type="password" onChange={e => handleFormInput("password", e.target.value)} />
                </div>
                <div className="field submit">
                    <input className="login-submit" value="Sign In" type="submit" />
                </div>
            </form>

            <span className="register-link">Don't have an account? <Link to="/register">Create one</Link></span>
        </div> 
    )

}