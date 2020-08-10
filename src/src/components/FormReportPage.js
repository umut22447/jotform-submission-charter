import { ReportProvider } from '../contexts/ReportContext'
import FormReport from './FormReport'
import { useParams } from "react-router-dom";
import React from 'react'

export default function FormReportPage() {

    let { formId } = useParams();

    return (
        <ReportProvider formId={formId}>
            <FormReport />
        </ReportProvider>
    )
}
