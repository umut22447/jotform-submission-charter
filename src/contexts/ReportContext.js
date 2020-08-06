import React, { useState, createContext, useContext, useEffect } from 'react'
import { getSubmissionById, getFormById, getSubmissionQuestionsById } from '../api'

const ReportContext = createContext({});

export const ReportProvider = ({ children, formId }) => {
    const [form, setForm] = useState({});
    const [report, setReport] = useState([]);   //Represents chart enabled fields
    const [answers, setAnswers] = useState([]);
    const deleteChartByField = (field) => {
        const newReport = report.filter(r => r !== field);
        setReport(newReport);
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
                setReport(chartArr);
            })
    }, [formId])

    return (
        <ReportContext.Provider value={{ report, answers, form, deleteChartByField}}>
            {children}
        </ReportContext.Provider>
    )
}

export const useReport = () => useContext(ReportContext);

export default ReportContext;