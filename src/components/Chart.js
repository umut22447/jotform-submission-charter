import React, { useRef, useEffect } from 'react'
import { fillDataArray, drawPieChart, drawLineChart, fillDataArrayByDate } from '../Util'
import { useReport } from '../contexts/ReportContext'


export default function Chart(props) {
    const divRef = useRef();
    const chartTypeSelectRef = useRef();
    const dateSelectRef = useRef();
    const { answers, deleteChartByField, changeChartTypeByField, changeDateByField, submissions } = useReport();
    const { field, title, chartType, date } = props.report;
    const handleClick = () => {
        deleteChartByField(field);
    }

    useEffect(() => {
        const dataArr = fillDataArray(answers, field);
        const updatedDataArr = fillDataArrayByDate(dataArr, field, date, submissions);
        if(chartType === "Pie"){
            drawPieChart(updatedDataArr, divRef);
        }
        else{
            drawLineChart(updatedDataArr, divRef);
        }
    }, [answers, field, divRef, title, chartType, date, submissions]);

    const handleChartTypeChange = () => {
        const selectedValue = chartTypeSelectRef.current.value;
        changeChartTypeByField(field, selectedValue);
    }

    const handleDateChange = () => {
        const dateValue = dateSelectRef.current.value;
        changeDateByField(field, dateValue);
    }

    return (
        <div className=''>
            <strong>{title}</strong>
            <select ref={chartTypeSelectRef} onChange={handleChartTypeChange}>
                <option>Pie</option>
                <option>Line</option>
            </select>
            <select ref={dateSelectRef} onChange={handleDateChange}>
                <option value='All'>All</option>
                <option value='last7days'>Last 7 Days</option>
                <option value='last3month'>Last 3 Month</option>
            </select>
            <div ref={divRef} />
            <button className='btn btn-danger' onClick={handleClick}>Delete</button>
        </div>
    );
}
