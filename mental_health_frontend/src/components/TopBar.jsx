import { Link } from "react-router-dom";
import { useAuth } from "../authContext";

export default function TopBar() {
    const { currentUser, logout, loginWithToken } = useAuth();

    if (localStorage.getItem("user_token") && !currentUser.isLoggedIn) {
        loginWithToken(localStorage.getItem("user_token"));
    }

    return (
        <div className="top-bar">
            <h3>Mental Health Journaling</h3>
            {currentUser.isLoggedIn || localStorage.getItem("user_token") ? 
            <div className="user-info"> 
                <strong>Welcome, {currentUser.user.username} </strong> 
                <span onClick={logout}>Log Out</span>
            </div>
            : 
            <h4><Link to="/login">Login</Link></h4>}
        </div>
    )
}
