import React,{useRef} from 'react'
import {useForms} from '../contexts/FormsContext'

export default function SearchBox(){

    const {forms, setFilteredForms} = useForms();
    const inputRef = useRef();
    const handleChange = () => {
        let newValue = inputRef.current.value;
        const newForms = forms.filter(form => form.title.toLowerCase().includes(newValue.toLowerCase()));
        setFilteredForms(newForms);
    }

    return (
        <div className='d-flex justify-content-center mt-3'>
            <div>
                <input ref={inputRef} class="" type="search" placeholder="Search" aria-label="Search" onChange={handleChange}/>
            </div>
        </div>

    )
}
