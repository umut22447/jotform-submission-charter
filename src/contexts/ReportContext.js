import React, { useState, createContext, useContext, useEffect } from 'react'
import { getSubmissionById, getFormById } from '../api'
import { getReportByFormId } from '../Util'
import localforage from 'localforage'

const ReportContext = createContext({});

export const ReportProvider = ({ children, formId }) => {
    const [form, setForm] = useState({});
    const [answers, setAnswers] = useState([]);
    const [report, _setReport] = useState([]);   //Represents chart enabled fields
    const [submissions, setSubmissions] = useState([]);
    const setReport = newReport => {
        _setReport(newReport);
        localforage.setItem(String(form.id), newReport);
    }

    const addNewReport = (rep) => {
        const newReport = report;
        newReport.push(rep);
        setReport(newReport);
    }

    const deleteChartByIndex = (index) => {
        const newReport = report.filter( (r, reportIndex) => reportIndex !== index);    //If the given index is not the searching element then keep it in the array.
        setReport(newReport);
    }

    const changeChartTypeByField = (index, chartType) => {
        const newReport = report.map((r, reportIndex) => {
            if (index === reportIndex) {
                return { ...r, chartType }
            }

            return r
        });

        setReport(newReport);
    }

    const changeDateByField = (index, date) => {
        const newReport = report.map((r,reportIndex) => {
            if (index === reportIndex) {
                return { ...r, date }
            }

            return r
        });

        setReport(newReport);
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

        getReportByFormId(formId).then(_setReport);

    }, [formId])

    return (
        <ReportContext.Provider value={{ report, answers, form, deleteChartByIndex, changeChartTypeByField, changeDateByField, submissions, addNewReport }}>
            {children}
        </ReportContext.Provider>
    )
}

export const useReport = () => useContext(ReportContext);

export default ReportContext;