import { createContext, useState, useContext } from "react";

const AuthContext = createContext({
    user: "",
    isLoggedIn: false,
    token: "",
    error: "Something went wrong"
});

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState({
        user: "",
        isLoggedIn: false,
        token: "",
        error: ""
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
                token: "",
                error: json.message
            })
        }
    }

    const logout = () => {
        setCurrentUser({
            user: "",
            isLoggedIn: false,
            token: "",
            error: ""
        });
        localStorage.removeItem("user_token");
    }

    const register = async (username, password, confirm) => {
        if (password !== confirm) {
            setCurrentUser({
                user: "",
                isLoggedIn: false,
                token: "",
                error: "Passwords must match"
            })
        }

        const res = await fetch("http://localhost:8000/users/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
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
                isLoggedIn: true
            })

            localStorage.setItem("user_token", json.access_token)
        } else {
            setCurrentUser({
                user: "",
                isLoggedIn: false,
                token: "",
                error: json.message
            })
        }
    }

    return (
        <AuthContext.Provider value={{ currentUser, login, logout, register }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)