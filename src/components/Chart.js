import React, { useRef, useEffect } from 'react'
import { drawPieChart, drawLineChart, drawBarChart, fillDataArrayByDate, fillDataForLineChart } from '../Util'
import { useReport } from '../contexts/ReportContext'



export default function Chart(props) {
    const divRef = useRef();
    const { deleteChartByIndex, changeChartTypeByField, changeDateByField, submissions, swapReportElements, onDragStart, reportTitleChange } = useReport();
    const { field, title, chartType, date } = props.report;
    const reportIndex = props.index;
    const handleClick = (event) => {
        deleteChartByIndex(reportIndex);
    }

    useEffect(() => {
        if (chartType === "Pie") {
            const dataArr = fillDataArrayByDate(field, date, submissions);
            drawPieChart(dataArr, divRef);
        }
        else if (chartType === "Line") {
            const dataArr = fillDataForLineChart(field, date, submissions);
            drawLineChart(dataArr, divRef);
        }
        else {
            const dataArr = fillDataArrayByDate(field, date, submissions);
            drawBarChart(dataArr, divRef);
        }
    }, [field, divRef, title, chartType, date, submissions]);

    const handleChartTypeChange = (chartType) => {
        changeChartTypeByField(reportIndex, chartType);
    }

    const handleDateChange = (date) => {
        changeDateByField(reportIndex, date);
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
            <div className="card">
                <div className="card-header bg-white">
                    <h5 className="card-header-title mr-auto mw-500" contentEditable="true" onBlur={handleHeaderChange}>
                        {title}
                    </h5>
                    <div className="header-toolbar noexport">
                        <div className="dropdown">
                            <button className="chart-option-dropdown dropdown-toggle" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            </button>
                            <ul className="dropdown-menu">
                                <li className="drowdown-submenu">
                                    <strong>Chart Type</strong>
                                    <ul className="drowdown-menu">
                                        <button className="dropdown-item" onClick={() => handleChartTypeChange("Pie")}>Pie Chart</button>
                                        <button className="dropdown-item" onClick={() => handleChartTypeChange("Line")}>Line Chart</button>
                                        <button className="dropdown-item" onClick={() => handleChartTypeChange("Bar")}> Bar Chart</button>
                                    </ul>
                                </li>
                                <li className="drowdown-submenu">
                                    <strong>Date</strong>
                                    <ul className="drowdown-menu">
                                        <button className="dropdown-item" onClick={() => handleDateChange("All")}>All</button>
                                        <button className="dropdown-item" onClick={() => handleDateChange("last7days")}>Last 7 Days</button>
                                        <button className="dropdown-item" onClick={() => handleDateChange("last3month")}>Last 3 Months</button>
                                    </ul>
                                </li>
                            </ul>
                        </div>

                        <button className='chart-delete-button ml-auto p-2' onClick={handleClick}><svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-x" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" d="M11.854 4.146a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708-.708l7-7a.5.5 0 0 1 .708 0z" />
                            <path fill-rule="evenodd" d="M4.146 4.146a.5.5 0 0 0 0 .708l7 7a.5.5 0 0 0 .708-.708l-7-7a.5.5 0 0 0-.708 0z" />
                        </svg></button>
                    </div>

                </div>
                <div className='card-body'>
                    <div ref={divRef} className="border-right border-left border-bottom border-light" />
                </div>
                Date = {date==="last7days" ? "Last 7 Days" : date==="last3month" ? "Last 3 Months" : date} / Chart Type = {chartType}
            </div>

        </div>

    );
}
