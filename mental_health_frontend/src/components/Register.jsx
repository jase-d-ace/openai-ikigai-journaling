import { useState } from "react";
import { useAuth } from "../authContext";
import { Link, Navigate } from "react-router-dom";
import "../App.css";

export default function Register() {
    const { register } = useAuth();
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

    }

    return (
        localStorage.getItem("user_token") ?
        <Navigate replace to="/" /> :
        <div className="register">
            <header>
                <h2>Create an Account</h2>
            </header>
            <form className="register-form" onSubmit={handleFormSubmit}>
                <div className="field register-field username-field">
                    <label>Username</label>
                    <input className="register-text-input" onChange={e => handleFormInput("username", e.target.value)} type="text" />
                </div>
                <div className="field register-field password-field">
                    <label>Password</label>
                    <input className="register-text-input" onChange={e => handleFormInput("password", e.target.value)} type="password" />
                </div>
                <div className="field register-field confirm-field">
                    <label>Confirm password</label>
                    <input className="register-text-input" onChange={e => handleFormInput("confirm", e.target.value)} type="password" />
                </div>
                <div className="field submit">
                    <input className="register-submit" value="Sign Up" type="submit" />
                </div>
            </form>

            <span className="login-link">Already have an account? <Link to="/login">Log In!</Link></span>
        </div>
    )
}