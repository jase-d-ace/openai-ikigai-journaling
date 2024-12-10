import { createContext, useState } from "react";
import { Navigate } from "react-router-dom";

export const AuthContext = createContext({
    user: "",
    isLoggedIn: false,
    token: ""
});

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState({
        user: {},
        isLoggedIn: false,
        token: ""
    });

    const login = async (username, password) => {
        const res = await fetch("http://localhost:8000/users/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username,
                password
            })
        })

        const json = await res.json();

        if (json.status == 200) {
            setCurrentUser({
                user: json.user,
                token: json.access_token,
                isLoggedIn: true,
            })

            localStorage.setItem("user_token", json.access_token)
        } else {
            setCurrentUser({
                user: "",
                isLoggedIn: false,
                token: ""
            })
        }
    }

    const logout = () => {
        setCurrentUser({
            user: "",
            isLoggedIn: false,
            token: ""
        });
    }

    return (
        <AuthContext.Provider value={{ currentUser, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}