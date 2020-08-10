import React, { useRef, useEffect } from 'react'
import { fillDataArray, drawGoogleChart } from '../Util'
import { useReport } from '../contexts/ReportContext'


export default function Chart(props) {
    const divRef = useRef();
    const chartTypeSelectRef = useRef();
    const dateSelectRef = useRef();
    const { answers, deleteChartByField, changeChartTypeByField, changeDateByField } = useReport();
    const { field, title, chartType, date } = props.report;
    const handleClick = () => {
        deleteChartByField(field);
    }

    useEffect(() => {
        var dataArr = fillDataArray(answers, field);
        drawGoogleChart(dataArr, title, divRef);
    }, [answers, field, divRef, title, chartType, date]);

    const handleChartTypeChange = () => {
        let selectedValue = chartTypeSelectRef.current.value;
        changeChartTypeByField(field, selectedValue);
    }

    const handleDateChange = () => {
        let dateValue = dateSelectRef.current.value;
        let currentDate = new Date();
        let date = "";
        switch (dateValue) {
            case 'All':
                date = "All";
                break;
            case 'last7days':
                currentDate.setDate(currentDate.getDate() - 7);
                date = currentDate.toString();
                break;
            case 'last3month':
                currentDate.setDate(currentDate.getDate() - 90);
                date = currentDate.toString();
                break;
            default:
                date = "All";
                break;
        }

        changeDateByField(field, date);
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
