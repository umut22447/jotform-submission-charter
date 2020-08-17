import React, {
    createContext, useState, useEffect, useContext
} from 'react';
import { getForms } from '../api'

const FormsContext = createContext({});

export const FormsProvider = ({ children }) => {
    const [forms, setForms] = useState([]); //Includes all form
    const [filteredForms, setFilteredForms] = useState([]); //The forms depends on the conditions

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