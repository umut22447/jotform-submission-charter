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

function isAnswerExist(arr, search) {        //It returns index of element if search exits. Else return -1 element
    for (let i = 0; i < arr.length; i++) {
        if (arr[i][0] === search) {
            return i;
        }
    }
    return -1;
}

export const drawGoogleChart = (dataArray, title, divRef) => {
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