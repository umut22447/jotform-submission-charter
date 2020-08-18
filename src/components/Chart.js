import React, { useRef, useEffect } from 'react'
import { drawPieChart, drawLineChart, fillDataArrayByDate, fillDataForLineChart } from '../Util'
import { useReport } from '../contexts/ReportContext'



export default function Chart(props) {
    const divRef = useRef();
    const { answers, deleteChartByIndex, changeChartTypeByField, changeDateByField, submissions, swapReportElements, onDragStart, reportTitleChange } = useReport();
    const { field, title, chartType, date } = props.report;
    const reportIndex = props.index;
    const handleClick = () => {
        deleteChartByIndex(reportIndex);
    }

    useEffect(() => {
        if (chartType === "Pie") {
            const dataArr = fillDataArrayByDate(field, date, submissions);
            drawPieChart(dataArr, divRef);
        }
        else {
            const dataArr = fillDataForLineChart(submissions, field, date);
            drawLineChart(dataArr, divRef);
        }
    }, [answers, field, divRef, title, chartType, date, submissions]);

    const handleChartTypeChange = (event) => {
        const selectedValue = event.target.value;
        changeChartTypeByField(reportIndex, selectedValue);
    }

    const handleDateChange = (event) => {
        const dateValue = event.target.value;
        changeDateByField(reportIndex, dateValue);
    }

    const allowDrop = (event) => {
        event.preventDefault();
    }

    const drag = () => {
        onDragStart(reportIndex);
    }

    const drop = (event) => {
        event.preventDefault();
        swapReportElements(reportIndex);
    }

    const handleHeaderChange = (event) => {
        const newValue = event.target.innerText;
        reportTitleChange(reportIndex, newValue);
    }

    return (
        <div className='float-left' draggable="true" onDragOver={allowDrop} onDragStart={drag} onDrop={drop}>
            <strong contentEditable="true" onBlur={handleHeaderChange}>{title}</strong>
            <div ref={divRef} />
            <select onChange={handleChartTypeChange} value={chartType}>
                <option>Pie</option>
                <option>Line</option>
            </select>
            <select onChange={handleDateChange} value={date}>
                <option value='All'>All</option>
                <option value='last7days'>Last 7 Days</option>
                <option value='last3month'>Last 3 Month</option>
            </select>
            <button className='btn btn-danger' onClick={handleClick}>Delete</button>
        </div>
    );
}
