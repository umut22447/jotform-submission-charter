import React, {
    useState, useEffect
} from 'react';
import { useParams } from "react-router-dom";
import { getFormById, getSubmissionById, getSubmissionQuestionsById } from '../api'
import Chart from './Chart'

export default function FormReport() {

    let { formId } = useParams();
    const [form, setForm] = useState({});
    //const [submission, setSubmission] = useState([]);
    const [answers, setAnswers] = useState([]);
    const [chartEnabledFields, setChartEnabledFields] = useState([]);

    useEffect(() => {
        getFormById(formId)
            .then(setForm);

        getSubmissionQuestionsById(formId)
            .then(questions => {
                const chartArr = Object.keys(questions).filter(q => {
                    return questions[q].type === 'control_dropdown' ||
                        questions[q].type === 'control_rating' ||
                        questions[q].type === 'control_scale' ||
                        questions[q].type === 'control_radio' ||
                        questions[q].type === 'control_textbox' ||
                        questions[q].type === 'control_textarea'
                });
                setChartEnabledFields(chartArr);
            })

        getSubmissionById(formId)
            .then(submission => {
                const newAnswers = submission.map(s => s.answers);
                setAnswers(newAnswers);
                //setSubmission(submission);
            });
    }, [formId]);

    return (
        <div>
            <h1>Answer Reports for {form.title}</h1><br />

            {chartEnabledFields.map(c => {
                var dataArr = [];
                var answerText = "";
                answers.map(a => {
                    console.log(a[c].text + " sorusuna gelen cevap : " + a[c].answer);
                    let indexOfAnswer = isAnswerExist(dataArr, a[c].answer);
                    if (indexOfAnswer !== -1) {
                        dataArr[indexOfAnswer][1]++;    //Increase the answer count in the array if the answer is already exists in array.
                    }
                    else {
                        let newData = [a[c].answer, 1];     //Creates a new answer with count 1 and push it to dataArr
                        dataArr.push(newData);
                    }
                    answerText = a[c].text;
                })
                return(<Chart answerText={answerText} data={dataArr}/>)
            })}
        </div>
    )
}

function isAnswerExist(arr, search) {        //It returns index of element if search exits. Else return -1 element
    for (let i = 0; i < arr.length; i++) {
        if (arr[i][0] === search) {
            return i;
        }
    }
    return -1;
}