import React, {
    createContext, useState, useEffect, useContext
} from 'react';
import { getForms } from '../api'

const FormsContext = createContext({});

export const FormsProvider = ({ children }) => {
    const [forms, setForms] = useState([]);
    const [filteredForms, setFilteredForms] = useState([]);

    useEffect(() => {
        getForms()
        .then(forms => {
            setForms(forms);
            setFilteredForms(forms);
        });
    }, []);

    return (
        <FormsContext.Provider value={{ forms, setForms, filteredForms, setFilteredForms }}>
            {children}
        </FormsContext.Provider>
    );
};

export const useForms = () => useContext(FormsContext);

export default FormsContext;