import React, {
    createContext, useState, useEffect, useContext
} from 'react';
import { getForms } from '../api'

const FormsContext = createContext({});

export const FormsProvider = ({ children }) => {
    const [forms, setForms] = useState([]); //Includes all form
    const [filteredForms, setFilteredForms] = useState([]); //The forms depends on the conditions
    const [searchValue, setSearchValue] = useState("");

    useEffect(() => {
        getForms()
            .then(setForms);
    }, []);

    useEffect(() => {
        const newForms = forms.filter(form => form.title.toLowerCase().includes(searchValue.toLowerCase()));
        setFilteredForms(newForms);
    }, [forms, searchValue]);

    return (
        <FormsContext.Provider value={{ forms, setForms, filteredForms, setSearchValue, searchValue }}>
            {children}
        </FormsContext.Provider>
    );
};

export const useForms = () => useContext(FormsContext);

export default FormsContext;