import React, { useState, createContext, useContext, useEffect } from 'react'
import { getSubmissionById, getFormById, getSubmissionQuestionsById } from '../api'

const ReportContext = createContext({});

export const ReportProvider = ({ children, formId }) => {
    const [form, setForm] = useState({});
    const [answers, setAnswers] = useState([]);
    const [report, setReport] = useState([]);   //Represents chart enabled fields
    const [deletedReport, setDeletedReport] = useState([]);
    const [questions, setQuestions] = useState([]);

    const deleteChartByField = (field) => {
        const newReport = report.filter(r => r !== field);
        let newDeletedReport = deletedReport;
        newDeletedReport.push(field);
        setReport(newReport);
        setDeletedReport(newDeletedReport);
    }

    const addChartByField = (field) => {
        const newDeletedReport = deletedReport.filter(d => d !== field);
        let newReport = report;
        newReport.push(field);
        setReport(newReport);
        setDeletedReport(newDeletedReport);
    }

    useEffect(() => {
        getSubmissionById(formId)
            .then(submission => {
                const newAnswers = submission.map(s => s.answers);
                setAnswers(newAnswers);
            });

        getFormById(formId)
            .then(setForm);

        getSubmissionQuestionsById(formId)
            .then(questions => {
                const chartArr = Object.keys(questions).filter(q => {
                    return questions[q].type === 'control_dropdown' ||
                        questions[q].type === 'control_checkbox' ||
                        questions[q].type === 'control_rating' ||
                        questions[q].type === 'control_scale' ||
                        questions[q].type === 'control_radio' ||
                        questions[q].type === 'control_textbox' ||
                        questions[q].type === 'control_textarea' ||
                        questions[q].type === 'control_number' ||
                        (questions[q].type === 'control_widget' && questions[q].cfname === "Beğen ve Beğenme Butonları")
                });

                const newReport = chartArr.map(field => {
                    let title = questions[field].text;
                    let reportObject = { "field": field, "title": title };
                    return reportObject;
                })

                setReport(newReport);

                
                const questionsArr = chartArr.map(c => questions[c]);
                setQuestions(questionsArr);
            })
    }, [formId])

    return (
        <ReportContext.Provider value={{ report, answers, form, addChartByField, deleteChartByField, deletedReport }}>
            {children}
            {console.log(questions)}
        </ReportContext.Provider>
    )
}

export const useReport = () => useContext(ReportContext);

export default ReportContext;