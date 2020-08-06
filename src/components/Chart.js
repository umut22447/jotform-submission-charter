import React, { useRef, useEffect } from 'react'
import { fillDataArray, drawGoogleChart } from '../Util'
import { useReport } from '../contexts/ReportContext'


export default function Chart(props) {
    const divRef = useRef();
    const { answers, deleteChartByField } = useReport();
    const { field } = props;
    const handleClick = () => {
        deleteChartByField(field);
    }

    useEffect(() => {
        var { dataArr, answerText } = fillDataArray(answers, field);
        drawGoogleChart(dataArr, answerText, divRef);

    }, [answers, field, divRef]);


    return (
        <div>
            <div ref={divRef} />
            <button className='chart-delete-button' onClick={handleClick}>Delete</button>
        </div>
    );
}
