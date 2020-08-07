import React from 'react';
import Chart from './Chart'
import { useReport } from '../contexts/ReportContext'

export default function FormReport() {

    const { form, report, deletedReport, addChartByField } = useReport();

    const handleAddClick = (field) => {
        addChartByField(field);
    }

    return (
        <div>
            <h1>Answer Reports for <strong className='text-info'>{form.title}</strong></h1><br />
            {deletedReport.map(d => {
                return (<button className='btn btn-outline-success' onClick={() => { handleAddClick(d) }}>Add Report {d} Again</button>)
            })}

            <br />
            {report.map(r => {
                return (<Chart field={r} />)
            })}


        </div>
    )
}