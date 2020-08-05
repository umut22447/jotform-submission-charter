import React, { useRef, useEffect } from 'react'
import { fillDataArray, drawGoogleChart } from '../Util'


export default function Chart(props) {
    const divRef = useRef();
    const { answers } = props;
    const { field } = props;


    useEffect(() => {
        var { dataArr, answerText } = fillDataArray(answers, field);
        drawGoogleChart(dataArr, answerText, divRef);

    }, [answers, field, divRef]);


    return <div ref={divRef} />;
}
