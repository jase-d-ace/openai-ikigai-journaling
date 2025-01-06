import { useState } from "react";
import { useAuth } from "../authContext";
import { Link, Navigate } from "react-router-dom";
import "../App.css";

export default function Register() {
    const { currentUser, register } = useAuth();
    const [submitted, setSubmitted] = useState(false);
    const [registerFormData, setRegisterFormData] = useState({
        username: "",
        password: "",
        confirm: ""
    })

    const handleFormInput = (name, text) => {
        setRegisterFormData({...registerFormData, [name]: text})
    }

    const handleFormSubmit = async e => {
        e.preventDefault();
        await register(registerFormData.username, registerFormData.password, registerFormData.confirm)
        setSubmitted(true);

    }

    return (
        currentUser.isLoggedIn ?
        <Navigate replace to="/" /> :
        <div className="register">
            <header>
                <h2>Create an Account</h2>
            </header>
            {submitted && <span className="error">{currentUser.error}</span>}
            <form className="register-form" onSubmit={handleFormSubmit} data-testid="registration-form">
                <div className="field register-field username-field">
                    <label htmlFor="username">Username</label>
                    <input id="username" className="register-text-input" placeholder="Username" onChange={e => handleFormInput("username", e.target.value)} type="text" />
                </div>
                <div className="field register-field password-field">
                    <label htmlFor="password">Password</label>
                    <input id="password" className="register-text-input" placeholder="Password" onChange={e => handleFormInput("password", e.target.value)} type="password" />
                </div>
                <div className="field register-field confirm-field">
                    <label htmlFor="confirm">Confirm password</label>
                    <input id="confirm" className="register-text-input" placeholder="Confirm" onChange={e => handleFormInput("confirm", e.target.value)} type="password" />
                </div>
                <div className="field submit">
                    <input className="register-submit" value="Sign Up" type="submit" />
                </div>
            </form>

            <span className="login-link">Already have an account? <Link to="/login">Log In!</Link></span>
        </div>
    )
}