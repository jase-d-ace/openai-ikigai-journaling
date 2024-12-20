import { Link, useLocation } from 'react-router-dom';
import { useAuth } from "../authContext";

export default function Nav() {
    const location = useLocation();
    const { currentUser } = useAuth();

    return (
        currentUser.isLoggedIn ? 
            <div className="navigation">
                <nav>
                    <span><Link className={`nav-link ${location.pathname == "/what-is" ? 'current' : ""}`} to="/what-is"> About </Link> | </span>
                    <span><Link className={`nav-link ${location.pathname == "/" ? 'current' : ""}`} to="/">Today</Link> | </span>
                    <span><Link className={`nav-link ${location.pathname == "/historical" ? 'current' : ""}`} to="/historical">Past Entries</Link></span>
                </nav>
            </div> : 
            <header className="hero-image">
                <h1>Find Your Ikigai</h1>
            </header>
    )
}