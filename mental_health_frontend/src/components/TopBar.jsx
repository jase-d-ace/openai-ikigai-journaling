import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../authContext";

export default function TopBar() {
    const context = useContext(AuthContext);

    return (
        <div className="top-bar">
            <h3>Mental Health Journaling</h3>
            {context.isLoggedIn ? <h4>You are welcome here</h4> : <h4><Link to="/login">Login</Link></h4>}
        </div>
    )
}
