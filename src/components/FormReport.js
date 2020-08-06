import React from 'react';
import Chart from './Chart'
import {useReport} from '../contexts/ReportContext'

export default function FormReport() {

    const {form, report} = useReport();

    return (
        <div>
            <h1>Answer Reports for {form.title}</h1><br />
            {report.map(r => {
                return (<Chart field={r} />)
            })}

        </div>
    )
}