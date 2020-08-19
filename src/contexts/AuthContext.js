import React, {
    createContext, useState, useEffect, useContext
} from 'react';
import { getUser } from '../api'
import localforage from 'localforage'


const AuthContext = createContext({});
export const api = {};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const logout = async () => {
        await global.JF.logout();
        await localforage.removeItem("api");
        setUser(null);
    }

    useEffect(() => {
        if (user === null) {
            console.log("USER NULL OLDU")
            localforage.getItem("api").then(p => {
                if (p) {
                    api.key = p.key;
                    console.log("GIRIS YAPILMIS")
                    getUser(api.key).then(setUser);
                }
                else {
                    global.JF.login(() => {
                        console.log("GİRİS YAPILIYOTR")
                        api.key = global.JF.getAPIKey();
                        localforage.setItem("api", api);
                        getUser(api.key).then(setUser);
                    });
                }
            });
        }
    }, [user]);

    return (
        <AuthContext.Provider value={{ user, logout }}>
            {user ? children : null}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);

export default AuthContext;