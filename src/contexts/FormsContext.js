import React, {
    createContext, useState, useEffect, useContext
} from 'react';
import { getForms } from '../api'

const FormsContext = createContext({});

export const FormsProvider = ({ children }) => {
    const [forms, setForms] = useState([]);

    useEffect(() => {
        getForms()
        .then(setForms);
    }, []);

    return (
        <FormsContext.Provider value={{ forms }}>
            {children}
        </FormsContext.Provider>
    );
};

export const useForms = () => useContext(FormsContext);

export default FormsContext;