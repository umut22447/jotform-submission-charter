import React, {
    createContext, useState, useEffect, useContext
} from 'react';
import { getUser } from '../api'

const AuthContext = createContext({});
export const api = {};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        global.JF.login(() => {
            api.key = global.JF.getAPIKey();
            getUser(api.key).then(setUser);
        });
    }, []);

    return (
        <AuthContext.Provider value={{ user }}>
            {user ? children : null}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);

export default AuthContext;