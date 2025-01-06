import { Link } from "react-router-dom";
import { useAuth } from "../authContext";
import "../App.css";

export default function TopBar() {
    const { currentUser, logout, loginWithToken } = useAuth();

    if (localStorage.getItem("user_token") && !currentUser.isLoggedIn) {
        loginWithToken(localStorage.getItem("user_token"));
    }

    return (
        <div className="top-bar">
            <Link to="/"><h3>Your Ikigai</h3></Link>
            {currentUser.isLoggedIn ? 
            <div className="user-info"> 
                <strong>Welcome, <Link to="/me"><strong>{currentUser.user.username}</strong></Link> |</strong> 
                <span className="logout" onClick={logout}> Log Out</span>
            </div>
            : 
            <h4><Link to="/login">Login</Link></h4>}
        </div>
    )
}
