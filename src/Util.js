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
    console.log(filteredAnswers);
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
            'width': 400,
            'height': 300
        };
        var chart = new global.google.visualization.PieChart(divRef.current);
        chart.draw(data, options);
    }
    global.google.charts.load('current', { 'packages': ['corechart'] });
    global.google.charts.setOnLoadCallback(drawChart);
}

export const drawLineChart = (dataArray, divRef) => {

    var drawBackgroundColor = () => {
        var data = new global.google.visualization.arrayToDataTable(dataArray);

        var options = {
            title: 'Company Performance',
            curveType: 'function',
            legend: { position: 'bottom' }
        };

        var chart = new global.google.visualization.LineChart(divRef.current);
        chart.draw(data, options);
    }

    global.google.charts.load('current', { packages: ['corechart', 'line'] });
    global.google.charts.setOnLoadCallback(drawBackgroundColor);
}

export const fillDataForLineChart = (submissions, field, date) => {
    const dateCondition = getConditionDate(date);
    const filteredSubmissions = submissions.filter(s => new Date(s.created_at) >= dateCondition);
    var dataArray = [];
    console.log(filteredSubmissions);
    var newRow = ["Date"];
    filteredSubmissions.forEach(s => {
        const ans = s.answers[field].answer;
        const index = newRow.findIndex(r => r === ans);
        if (index === -1) {
            newRow.push(ans);
        }
    });
    dataArray.push(newRow);
    filteredSubmissions.forEach(s => {
        const submissionDate = new Date(s.created_at);
        const newDataRow = prepareDataForLineChart(s.answers, field, submissionDate.toDateString(), dataArray[0]);
        dataArray.push(newDataRow);
    })
    dataArray = modifyDataArray(dataArray);
    console.log(dataArray);
    return dataArray;
}

export const prepareDataForLineChart = (answers, field, submissionDate, firstRow) => {
    const ans = answers[field].answer;
    let newDataRow = [];
    newDataRow.push(submissionDate);
    for (let i = 1; i < firstRow.length; i++) {
        if (firstRow[i] === ans) {
            newDataRow.push(1);
        }
        newDataRow.push(0);
    }
    newDataRow.pop();

    return newDataRow;
}

export const modifyDataArray = (dataArray) => {
    for (let i = dataArray.length - 1; i > 0; i--) {
        if (dataArray[i][0] === dataArray[i - 1][0]) {
            for (let j = 1; j < dataArray[0].length; j++) {
                dataArray[i - 1][j] += dataArray[i][j];
            }
            dataArray.splice(i, 1);
        }
    }
    return dataArray;
}