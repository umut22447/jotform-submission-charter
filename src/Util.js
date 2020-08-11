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

export const editDataArrayByDate = (dataArray, field, date, submissions) => {
    if (date === "All") {   //If date selected as All then it returns the full info dataArray that is already defined.
        return dataArray;
    }
    let dateCondition = getConditionDate(date);
    const answers = submissions.map(s => {
        const submissionDate = new Date(s.created_at);
        if (submissionDate > dateCondition) {
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
        var data = new global.google.visualization.DataTable();
        data.addColumn('number', 'X');
        data.addColumn('number', 'Dogs');

        data.addRows([
            [0, 0], [1, 10], [2, 23], [3, 17], [4, 18], [5, 9],
            [6, 11], [7, 27], [8, 33], [9, 40], [10, 32], [11, 35],
            [12, 30], [13, 40], [14, 42], [15, 47], [16, 44], [17, 48],
            [18, 52], [19, 54], [20, 42], [21, 55], [22, 56], [23, 57],
            [24, 60], [25, 50], [26, 52], [27, 51], [28, 49], [29, 53],
            [30, 55], [31, 60], [32, 61], [33, 59], [34, 62], [35, 65],
            [36, 62], [37, 58], [38, 55], [39, 61], [40, 64], [41, 65],
            [42, 63], [43, 66], [44, 67], [45, 69], [46, 69], [47, 70],
            [48, 72], [49, 68], [50, 66], [51, 65], [52, 67], [53, 70],
            [54, 71], [55, 72], [56, 73], [57, 75], [58, 70], [59, 68],
            [60, 64], [61, 60], [62, 65], [63, 67], [64, 68], [65, 69],
            [66, 70], [67, 72], [68, 75], [69, 80]
        ]);

        var options = {
            hAxis: {
                title: 'Time'
            },
            vAxis: {
                title: 'Popularity'
            },
            backgroundColor: '#f1f8e9'
        };

        var chart = new global.google.visualization.LineChart(divRef.current);
        chart.draw(data, options);
    }

    global.google.charts.load('current', { packages: ['corechart', 'line'] });
    global.google.charts.setOnLoadCallback(drawBackgroundColor);
}