import React, { createContext, useState } from "react";

export const AuthContext = createContext({
    user: {},
    isLoggedIn: true,
    token: ""
});

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState({
        user: {},
        isLoggedIn: true,
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

        if (response.ok) {
            setCurrentUser({
                user: json.user,
                token: json.access_token,
                isLoggedIn: true,
            })
        } else {
            setCurrentUser({
                user: {},
                isLoggedIn: false,
                token: ""
            })
        }
    }

    const logout = () => {
        setCurrentUser({
            user: {},
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