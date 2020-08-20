import React from 'react'
import { useForms } from '../contexts/FormsContext'

export default function SearchBox() {

    const { setSearchValue, searchValue } = useForms();

    const handleChange = (event) => {
        let newValue = event.target.value;
        setSearchValue(newValue);
    }

    return (
        <div className='searchbox-root-div'>
            <div>
                <input className="rounded w-100" type="search" placeholder="Search Form" aria-label="Search" onChange={handleChange} value={searchValue} />
            </div>
        </div>

    )
}
