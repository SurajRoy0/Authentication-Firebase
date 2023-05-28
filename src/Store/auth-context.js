import React, { useEffect, useState } from "react"

const AuthContext = React.createContext({
    token: '',
    isLoggedIn: false,
    login: (token) => { },
    logout: () => { }
})


export const AuthContextProvider = props => {
    const storedToken = localStorage.getItem('token')
    const [token, setToken] = useState(storedToken);

    const userIsLoggedIn = !!token;

    const loginHandler = token => {
        setToken(token);
        localStorage.setItem('token', token)
    }

    const logoutHandler = () => {
        setToken(null);
        localStorage.removeItem('token')

    }
    useEffect(() => {
        console.log('run')
        let identifier = null;
        if (userIsLoggedIn) {
            identifier = setTimeout(() => {
                localStorage.removeItem('token')
                console.log('time')
            }, 5 * 60 * 1000)
        }
        return () => {
            clearTimeout(identifier)
        }
    }, [userIsLoggedIn])
    const contextValue = {
        token: token,
        isLoggedIn: userIsLoggedIn,
        login: loginHandler,
        logout: logoutHandler
    }

    return <AuthContext.Provider value={contextValue}>{props.children}</AuthContext.Provider>
}

export default AuthContext;