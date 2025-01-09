import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../authContext.jsx";

export default function ProtectedRoute({ children }) {

    const { currentUser, loginWithToken } = useAuth();
    const location = useLocation();

    if (localStorage.getItem("user_token") && !currentUser.isLoggedIn) {
        loginWithToken(localStorage.getItem("user_token"));
    }
    if (!currentUser.isLoggedIn) {
        return <Navigate to="/login" state={{ from: location }}/>
    }

    return children;
}