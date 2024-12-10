import { Link } from "react-router-dom";
import { AuthContext } from "../authContext";

export default function Login() {
    return (
        <div className="login">
            <h1>Log in to start journaling</h1>

            <form>
                <label>Username</label>
                <input type="text" />
                <label>Password</label>
                <input type="password" />
                <input type="submit" />
            </form>

            <span>Don't have an account? <Link to="/register">Create one</Link></span>
        </div>
    )

}