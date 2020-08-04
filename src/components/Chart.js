import React, {useRef, useEffect} from 'react'


export default function Chart(props) {
    const divRef = useRef();

    useEffect(() => {
        var drawChart = () => {
            var data = new global.google.visualization.DataTable();
            data.addColumn('string', 'Answer');
            data.addColumn('number', 'Answer Count');
            data.addRows(props.data);
            var options = {
                'title': 'Answers for ' + props.answerText,
                'width': 400,
                'height': 300
            };
            var chart = new global.google.visualization.PieChart(divRef.current);
            chart.draw(data, options);
        }
        global.google.charts.load('current', { 'packages': ['corechart'] });
        global.google.charts.setOnLoadCallback(drawChart);
    }, [props.answerText,props.data]);


    return <div ref={divRef}/>;
}
