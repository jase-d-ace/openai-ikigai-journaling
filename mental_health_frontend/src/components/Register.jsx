import { Link } from "react-router-dom";

export default function Register() {
    return (
        <div className="register">
            <h1>Create an Account</h1>
            <form>
                <label>username</label>
                <input type="text" />
                <label>password</label>
                <input type="password" />
                <label>Confirm password</label>
                <input type="password" />

                <input type="submit" />
            </form>

            <span>Already have an account? <Link to="/login">Log In!</Link></span>
        </div>
    )
}