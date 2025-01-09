import { createContext, useState, useContext } from "react";

const AuthContext = createContext({
    user: {},
    isLoggedIn: false,
    token: "",
    error: "Something went wrong"
});

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState({
        user: {},
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
            user: {},
            isLoggedIn: false,
            token: "",
            error: ""
        });
        localStorage.removeItem("user_token");
    }

    const register = async (username, password, confirm) => {
        if (password !== confirm) {
            setCurrentUser({
                user: {},
                isLoggedIn: false,
                token: "",
                error: "Passwords must match"
            })
            return false;
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

            localStorage.setItem("user_token", json.access_token);
        } else {
            setCurrentUser({
                user: {},
                isLoggedIn: false,
                token: "",
                error: json.message
            })
            return false;
        }
    }

    const loginWithToken = async token => {
        const data = await fetch(`http://localhost:8000/users/token?token=${token}`);
        const json = await data.json();

        if (json.status == 200) {
            setCurrentUser({
                user: json.user,
                token: json.access_token,
                isLoggedIn: true
            })
        } else {
            setCurrentUser({
                user: {},
                isLoggedIn: false,
                token: "",
                error: json.message
            })
        }
        return false;
    }

    const updateUserInfo = async (id, token, first_name, last_name, description) => {
        const res = await fetch(`http://localhost:8000/users/update?id=${id}&token=${token}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                first_name,
                last_name,
                description
            })
        });

        const json = await res.json();

        if (json.status == 200) {
            setCurrentUser({
                ...currentUser,
                user: json.user,
                token: json.token,
            })
        } else {
            setCurrentUser({
                ...currentUser,
                error: json.message
            })
        }
    }

    return (
        <AuthContext.Provider value={{ currentUser, login, logout, register, loginWithToken, updateUserInfo }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)