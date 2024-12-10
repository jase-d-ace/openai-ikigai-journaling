import React, { createContext, useState } from "react";

export const AuthContext = createContext({
    user: null,
    isLoggedIn: false,
    token: "shhhhsecrettoken"
});

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);

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

        if (response.ok) {
            setCurrentUser({
                username,
                token: json.access_token
            })
        } else {
            setCurrentUser(null)
        }
    }

    const logout = () => {
        setCurrentUser(null);
    }

    return (
        <AuthContext.Provider value={{ currentUser, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}