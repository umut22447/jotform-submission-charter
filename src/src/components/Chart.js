import React, { useRef, useEffect } from 'react'
import { fillDataArray, drawGoogleChart } from '../Util'
import { useReport } from '../contexts/ReportContext'


export default function Chart(props) {
    const divRef = useRef();
    const chartTypeSelectRef = useRef();
    const { answers, deleteChartByField, changeChartTypeByField } = useReport();
    const { field, title, chartType } = props.report;
    const handleClick = () => {
        deleteChartByField(field);
    }

    useEffect(() => {
        var dataArr = fillDataArray(answers, field);
        drawGoogleChart(dataArr, title, divRef);
    }, [answers, field, divRef, title]);

    const handleChartTypeChange = () => {
        let selectedValue = chartTypeSelectRef.current.value;
        changeChartTypeByField(field ,selectedValue);
    }

    return (
        <div className=''>
            <strong>{title}</strong>
            <select ref={chartTypeSelectRef} onChange={handleChartTypeChange}>
                <option>Pie</option>
                <option>Line</option>
            </select>
            <div ref={divRef} />
            <button className='btn btn-danger' onClick={handleClick}>Delete</button>
            {console.log(chartType)}
        </div>
    );
}
