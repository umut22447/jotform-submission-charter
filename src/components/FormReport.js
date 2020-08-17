import React, { useState, useEffect, useRef } from 'react';
import Chart from './Chart'
import { useReport } from '../contexts/ReportContext'
import { getDefaultReport } from '../Util'

export default function FormReport() {

    const { form, report, addNewReport } = useReport();
    const [reportForOptions, setReportForOptions] = useState([]);
    const selectRef = useRef();

    useEffect(() => {
        getDefaultReport(form.id).then(setReportForOptions);
    }, [form]);

    const handleAddClick = () => {
        const field = selectRef.current.value;
        const newReport = reportForOptions.filter(r => r.field === field);  
        addNewReport(newReport[0]);     //Since I use 0 index of newReport is, filter returns an object array which length is always 1.
    }

    return (
        <div>
            <h1>Answer Reports for <strong className='text-info'>{form.title}</strong></h1><br />
            
            <br />
            {report.map( (r,index) => {
                return (<Chart report={r} index={index}/>)
            })}

            <div>
                <select ref={selectRef}>
                    {reportForOptions.map(r => {
                        return <option value={r.field}>{r.title}</option>
                    })}
                </select>
                <button onClick={handleAddClick}>Add</button>
            </div>

        </div>
    )
}