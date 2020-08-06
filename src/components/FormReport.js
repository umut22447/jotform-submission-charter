import React from 'react';
import Chart from './Chart'
import {useReport} from '../contexts/ReportContext'

export default function FormReport() {

    const {form, report, deletedReport, addChartByField} = useReport();

    const handleAddClick = (field) => {
        addChartByField(field);
    }

    return (
        <div>
            <h1>Answer Reports for {form.title}</h1><br />
            {deletedReport.map(d => {
                return (<button onClick={() => {handleAddClick(d)}}>Add Report {d} Again</button>)
            })}
            {report.map(r => {
                return (<Chart field={r} />)
            })}
            

        </div>
    )
}