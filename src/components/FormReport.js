import React from 'react';
import Chart from './Chart'
import { useReport } from '../contexts/ReportContext'

export default function FormReport() {

    const { form, report } = useReport();

    return (
        <div>
            <h1>Answer Reports for <strong className='text-info'>{form.title}</strong></h1><br />

            <br />
            {report.map(r => {
                return (<Chart report={r} />)
            })}

        </div>
    )
}