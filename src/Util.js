import localforage from 'localforage'
import { getSubmissionQuestionsById } from './api'


export const fillDataArray = (answers, field) => {
    var dataArr = [];
    answers.forEach(a => {
        console.log(a[field].text + " sorusuna gelen cevap : " + a[field].answer);
        if (typeof (a[field].answer) === "object") {    //If the field is multiple choice box.
            a[field].answer.forEach(a => {
                let index = isAnswerExist(dataArr, a);
                if (index !== -1) {
                    dataArr[index][1]++;
                }
                else {
                    let newData = [a, 1];
                    dataArr.push(newData);
                }
            })
        }
        else {                                             //If the field is not multiple choice box.
            let indexOfAnswer = isAnswerExist(dataArr, a[field].answer);
            if (indexOfAnswer !== -1) {
                dataArr[indexOfAnswer][1]++;    //Increase the answer count in the array if the answer is already exists in array.
            }
            else {
                if (a[field].answer) {                      //If the answer is not empty.
                    let newData = [a[field].answer, 1];     //Creates a new answer with count 1 and push it to dataArr
                    dataArr.push(newData);
                }

            }
        }
    })

    return dataArr;       //It returns the filled array.
}

export const fillDataArrayByDate = (field, date, submissions) => {
    console.log(submissions);
    const dateCondition = getConditionDate(date);
    const answers = submissions.map(s => {
        const submissionDate = new Date(s.created_at);
        if (submissionDate >= dateCondition) {
            return s.answers;
        }
        return null;
    })
    const filteredAnswers = answers.filter(a => a !== null);
    return fillDataArray(filteredAnswers, field);
}

export const getConditionDate = (date) => {
    let dateCondition = new Date();
    switch (date) {
        case "All":
            dateCondition = new Date(1998, 2, 16);
            return dateCondition;
        case "last7days":
            dateCondition.setDate(dateCondition.getDate() - 7);
            return dateCondition;
        case "last3month":
            dateCondition.setDate(dateCondition.getDate() - 90);
            return dateCondition;
        default:
            return dateCondition;
    }
}

function isAnswerExist(arr, search) {        //It returns index of element if search exits. Else return -1 element
    for (let i = 0; i < arr.length; i++) {
        if (arr[i][0] === search) {
            return i;
        }
    }
    return -1;
}

export const drawPieChart = (dataArray, divRef) => {
    var drawChart = () => {
        var data = new global.google.visualization.DataTable();
        data.addColumn('string', 'Answer');
        data.addColumn('number', 'Answer Count');
        data.addRows(dataArray);
        var options = {
            'width': 500,
            'height': 400
        };
        var chart = new global.google.visualization.PieChart(divRef.current);
        chart.draw(data, options);
    }
    global.google.charts.load('current', { 'packages': ['corechart'] });
    global.google.charts.setOnLoadCallback(drawChart);
}

export const drawLineChart = (dataArray, divRef) => {

    var drawBackgroundColor = () => {
        console.log(dataArray);
        var data = new global.google.visualization.arrayToDataTable(dataArray);
        var options = {
            curveType: 'function',
            legend: { position: 'bottom' },
            'width': 500,
            'height': 400
        };

        var chart = new global.google.visualization.LineChart(divRef.current);
        chart.draw(data, options);
    }

    global.google.charts.load('current', { packages: ['corechart', 'line'] });
    global.google.charts.setOnLoadCallback(drawBackgroundColor);
}

export const drawBarChart = (dataArr, divRef) => {
    const draw = () => {
        var data = new global.google.visualization.DataTable();
        data.addColumn('string', 'Answer');
        data.addColumn('number', 'Number of Answers');
        data.addRows(dataArr);
        var materialOptions = {
            width: 500,
            height: 400
        };
        console.log(data);
        var materialChart = new global.google.charts.Bar(divRef.current);
        materialChart.draw(data, materialOptions);
    }
    global.google.charts.load('current', { packages: ['corechart', 'bar'] });
    global.google.charts.setOnLoadCallback(draw);
}

export const fillDataForLineChart = (field, date, submissions) => {
    const dateCondition = getConditionDate(date);
    const filteredSubmissions = submissions.filter(s => new Date(s.created_at) >= dateCondition);
    var dataArray = [];
    var newRow = ["Date"];
    filteredSubmissions.forEach(s => {
        const ans = s.answers[field].answer;
        if (typeof (ans) === "object") {
            ans.forEach(a => {
                const index = newRow.findIndex(r => r === a);
                if (index === -1) {
                    newRow.push(a);
                }
            })
        }
        else {
            const index = newRow.findIndex(r => r === ans);
            if (index === -1) {
                newRow.push(ans);
            }
        }
    });
    dataArray.push(newRow);
    filteredSubmissions.forEach(s => {
        const submissionDate = new Date(s.created_at);
        const newDataRow = prepareDataForLineChart(s.answers, field, submissionDate.toDateString(), dataArray[0]);
        dataArray.push(newDataRow);
    })
    dataArray = modifyDataArray(dataArray);
    return dataArray;
}

export const prepareDataForLineChart = (answers, field, submissionDate, firstRow) => {
    const ans = answers[field].answer;
    let newDataRow = [];
    newDataRow.push(submissionDate);
    if (typeof (ans) === "object") {                            //If the type of the answers is an array which means the answers is multi-choice
        ans.forEach(a => {
            for (let i = 1; i < firstRow.length; i++) {         //Since skipping the first element which is "Date", I did not use firstRow.forEach or etc.
                if (firstRow[i] === a) {
                    if (newDataRow.length < firstRow.length) {
                        newDataRow.push(1);
                    }
                    else {
                        newDataRow[i]++;                //After first iteration newRow is created and length will equal to firstRow array.
                    }
                }
                if (newDataRow.length < firstRow.length) {
                    newDataRow.push(0);
                }
            }
        })
    }
    else {
        for (let i = 1; i < firstRow.length; i++) {         //Since skipping the first element which is "Date", I did not use firstRow.forEach or etc.
            if (firstRow[i] === ans) {
                newDataRow.push(1);
            }
            newDataRow.push(0);
        }
        newDataRow.pop();
    }
    return newDataRow;
}

export const modifyDataArray = (dataArray) => {
    for (let i = dataArray.length - 1; i > 0; i--) {
        if (dataArray[i][0].toString() === dataArray[i - 1][0].toString()) {
            for (let j = 1; j < dataArray[0].length; j++) {
                dataArray[i - 1][j] += dataArray[i][j];
            }
            dataArray.splice(i, 1);
        }
    }
    return dataArray;
}

export const getReportByFormId = async (formId) => {
    let report = await getReportFromDb(formId);
    if (report) {
        return report;
    }
    return getDefaultReport(formId);
}

const getReportFromDb = async (formId) => {
    const report = await localforage.getItem(String(formId))
    return report;
}

export const getDefaultReport = (formId) => {
    return getSubmissionQuestionsById(formId)
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
                let reportObject = { "field": field, "title": title, "chartType": "Pie", "date": "All" };
                return reportObject;
            })
            return newReport;
        })
}

export const drawCalendarChart = (dataArray, divRef) => {
    global.google.charts.load("current", { packages: ["calendar"] });
    global.google.charts.setOnLoadCallback(drawChart);

    function drawChart() {
        var dataTable = new global.google.visualization.DataTable();
        dataTable.addColumn({ type: 'date', id: 'Date' });
        dataTable.addColumn({ type: 'number', id: 'Count' });
        dataTable.addRows(dataArray);

        var chart = new global.google.visualization.Calendar(divRef.current);

        var options = {
            width: 1077,
            calendar: {
                underYearSpace: 10, // Bottom padding for the year labels.
                yearLabel: {
                  fontName: 'Times-Roman',
                  fontSize: 32,
                  color: '#1A8763',
                  bold: true,
                  italic: true
                }
              }
        };

        chart.draw(dataTable, options);
    }
}

export const fillDataArrayForCalendar = (submissions) => {
    let dataArray = [];
    submissions.forEach(sub => {
        const date = new Date(sub.created_at);
        const newRow = [(new Date(date.getFullYear(), date.getMonth(), date.getDate())), 1];
        dataArray.push(newRow);
    })
    console.log(dataArray)
    console.log(modifyDataArray(dataArray));
    return modifyDataArray(dataArray);
}

export const classNames = (...names) => {
    const uniqueStringSet = new Set();
    names.forEach(arg => {
        if (typeof (arg) === "object") {
            Object.entries(arg).forEach(([key, value]) => {
                if (value) {
                    uniqueStringSet.add(key);
                }
            });
        }
        else {
            uniqueStringSet.add(arg);
        }
    });
    return Array.from(uniqueStringSet).join(" ");
}