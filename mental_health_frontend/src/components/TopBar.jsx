import { Link } from "react-router-dom";
import { useAuth } from "../authContext";

export default function TopBar() {
    const { currentUser, logout } = useAuth();

    return (
        <div className="top-bar">
            <h3>Mental Health Journaling</h3>
            {currentUser.isLoggedIn ? 
            <div className="user-info"> 
                <strong>Welcome, {currentUser.user.username} </strong> 
                <span onClick={logout}>Log Out</span>
            </div>
            : 
            <h4><Link to="/login">Login</Link></h4>}
        </div>
    )
}
