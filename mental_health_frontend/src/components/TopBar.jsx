import { Link } from "react-router-dom";
import { useAuth } from "../authContext";

export default function TopBar() {
    const { currentUser } = useAuth();

    return (
        <div className="top-bar">
            <h3>Mental Health Journaling</h3>
            {currentUser.isLoggedIn ? <h4>Welcome, {currentUser.user.username}</h4> : <h4><Link to="/login">Login</Link></h4>}
        </div>
    )
}
