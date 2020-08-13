import React, { useState, createContext, useContext, useEffect } from 'react'
import { getSubmissionById, getFormById } from '../api'
import { getReportByFormId } from '../Util'
import localforage from 'localforage'

const ReportContext = createContext({});

export const ReportProvider = ({ children, formId }) => {
    const [form, setForm] = useState({});
    const [answers, setAnswers] = useState([]);
    const [report, setReport] = useState([]);   //Represents chart enabled fields
    const [submissions, setSubmissions] = useState([]);

    const deleteChartByField = (field) => {
        const newReport = report.filter(r => r.field !== field);
        setReport(newReport);
        localforage.setItem(String(form.id),newReport);
    }

    const changeChartTypeByField = (field, chartType) => {
        const newReport = report.map(r => {
            if (field === r.field) {
                return { ...r, chartType }
            }

            return r
        });

        setReport(newReport);
        localforage.setItem(String(form.id), newReport)
            .then(value => console.log(value))
            .catch(err => console.log(err));
    }

    const changeDateByField = (field, date) => {
        const newReport = report.map(r => {
            if (field === r.field) {
                return { ...r, date }
            }

            return r
        });

        setReport(newReport);
        localforage.setItem(String(form.id), newReport)
            .then(value => { console.log(value) })
            .catch(err => console.log(err));
    }

    useEffect(() => {
        getSubmissionById(formId)
            .then(submission => {
                const newAnswers = submission.map(s => s.answers);
                setAnswers(newAnswers);
            });

        getSubmissionById(formId)
            .then(setSubmissions);

        getFormById(formId)
            .then(setForm);

        getReportByFormId(formId).then(setReport);

    }, [formId])

    return (
        <ReportContext.Provider value={{ report, answers, form, deleteChartByField, changeChartTypeByField, changeDateByField, submissions }}>
            {children}
        </ReportContext.Provider>
    )
}

export const useReport = () => useContext(ReportContext);

export default ReportContext;