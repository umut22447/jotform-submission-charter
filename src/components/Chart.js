import React, { useRef, useEffect } from 'react'
import { drawPieChart, drawLineChart, drawBarChart, fillDataArrayByDate, fillDataForLineChart } from '../Util'
import { useReport } from '../contexts/ReportContext'



export default function Chart(props) {
    const divRef = useRef();
    const { deleteChartByIndex, changeChartTypeByField, changeDateByField, submissions, swapReportElements, onDragStart, reportTitleChange } = useReport();
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
        else if(chartType === "Line"){
            const dataArr = fillDataForLineChart(field, date, submissions);
            drawLineChart(dataArr, divRef);
        }
        else{
            const dataArr = fillDataArrayByDate(field, date, submissions);
            drawBarChart(dataArr, divRef);
        }
    }, [field, divRef, title, chartType, date, submissions]);

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
        <div className='d-flex flex-column m-3' draggable="true" onDragOver={allowDrop} onDragStart={drag} onDrop={drop}>
            <strong contentEditable="true" onBlur={handleHeaderChange}>{title}</strong>
            <div ref={divRef} className="border border-secondary" />
            <div className='border border-secondary noexport'>
                <select onChange={handleChartTypeChange} value={chartType}>
                    <option value="Pie">Pie Chart</option>
                    <option value="Line">Line Chart</option>
                    <option value="Bar">Bar Chart</option>
                </select>
                <select onChange={handleDateChange} value={date}>
                    <option value='All'>All</option>
                    <option value='last7days'>Last 7 Days</option>
                    <option value='last3month'>Last 3 Month</option>
                </select>
                <button className='btn btn-danger float-right' onClick={handleClick}>Delete</button>
            </div>
        </div>

    );
}
