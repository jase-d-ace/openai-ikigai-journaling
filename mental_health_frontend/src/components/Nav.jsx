import { useContext } from "react";
import { AuthContext } from "../authContext.jsx";
import { Link, useLocation } from 'react-router-dom';

export default function Nav() {
    const location = useLocation();
    const context = useContext(AuthContext)

    return (
        context.currentUser.isLoggedIn &&
            <div className="navigation">
                <nav>
                    <span><Link className={`nav-link ${location.pathname == "/" ? 'current' : ""}`} to="/">Today</Link> | </span>
                    <span><Link className={`nav-link ${location.pathname == "/historical" ? 'current' : ""}`} to="/historical">Past Entries</Link></span>
                </nav>
            </div>
    )
}