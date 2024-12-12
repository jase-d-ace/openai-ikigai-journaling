import { useState } from "react";
import { useAuth } from "../authContext";
import { Link } from "react-router-dom";

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
        <div className="register">
            <h1>Create an Account</h1>
            <form onSubmit={handleFormSubmit}>
                <label>username</label>
                <input onChange={e => handleFormInput("username", e.target.value)} type="text" />
                <label>password</label>
                <input onChange={e => handleFormInput("password", e.target.value)} type="password" />
                <label>Confirm password</label>
                <input onChange={e => handleFormInput("confirm", e.target.value)} type="password" />

                <input type="submit" />
            </form>

            <span>Already have an account? <Link to="/login">Log In!</Link></span>
        </div>
    )
}