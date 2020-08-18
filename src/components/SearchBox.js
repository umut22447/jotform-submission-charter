import React from 'react'
import {useForms} from '../contexts/FormsContext'

export default function SearchBox(){

    const {forms, setFilteredForms} = useForms();
    const handleChange = (event) => {
        let newValue = event.target.value;
        const newForms = forms.filter(form => form.title.toLowerCase().includes(newValue.toLowerCase()));
        setFilteredForms(newForms);
    }

    return (
        <div className='searchbox-root-div'>
            <div>
                <input className="rounded w-100" type="search" placeholder="Search Form" aria-label="Search" onChange={handleChange}/>
            </div>
        </div>

    )
}
