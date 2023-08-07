import { useContext, useState, createContext } from 'react';

import {getCookie, setCookie} from '../services/utils/cookie';
import {loginRequest, logoutRequest, registerRequest, token, userRequest} from "../api/auth";

const clearCookie = () => {
    setCookie('token', "", {
        'max-age': -1
    })
    setCookie('refreshToken', "", {
        'max-age': -1
    })
}


const AuthContext = createContext(undefined);

export function ProvideAuth({ children }) {
    const auth = useProvideAuth();
    return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    return useContext(AuthContext);
}

export function useProvideAuth() {
    const [user, setUser] = useState(null);

    const errorHandler = (error) => {
        if (error.message === 'jwt expired') {
            updateToken().then(() => getUser())
        }
        if (error.message === 'Token is invalid') {
            clearCookie()
        }
    }

    const updateToken = () => {
        return token({token: getCookie('refreshToken')})
            .then(res => {
                setCookie('token', res.accessToken);
                setCookie('refreshToken', res.refreshToken);
            })
            .catch(error => errorHandler(error))
    }

    const getUser = () => {
        return userRequest()
            .then(data => {
                console.log(data)
                if (data.success) {
                    setUser({ ...data.user, id: data.user._id });
                }
                return data.success;
            }).catch(error => errorHandler(error))
    };

    const login = async form => {
        const data = await loginRequest(form)
            .then(res => {
                console.log(res)
                setCookie('token', res.accessToken);
                setCookie('refreshToken', res.refreshToken);
                return res
            })
            .catch(error => console.log(error))

        if (data.success) {
            setUser(data.user);
        }
    };

    const register = async form => {
        const data = await registerRequest(form)
            .then(res => {
                console.log(res)
                setCookie('token', res.accessToken);
                setCookie('refreshToken', res.refreshToken);
                return res;
            })
            .then(data => data)
            .catch(err => console.log(err))

        if (data.success) {
            setUser({ ...data.user, id: data.user._id });
        }
    };

    const logout = () => {
        return logoutRequest()
            .then(() => {
                setUser(null)
                clearCookie()
            })
            .catch(err => console.log(err))
    };

    return {
        user,
        getUser,
        register,
        login,
        logout
        // signOut
    };
}