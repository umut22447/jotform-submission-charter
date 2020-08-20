import React, { useState, useEffect, useRef } from 'react';
import Chart from './Chart'
import { useReport } from '../contexts/ReportContext'
import { getDefaultReport } from '../Util'
import htmlToImage from 'html-to-image';
import download from 'downloadjs'

export default function FormReport() {

    const { form, report, addNewReport } = useReport();
    const [reportForOptions, setReportForOptions] = useState([]);
    const selectRef = useRef();
    const divRef = useRef();

    useEffect(() => {
        getDefaultReport(form.id).then(setReportForOptions);

    }, [form]);

    const handleAddClick = () => {
        const field = selectRef.current.value;
        const newReport = reportForOptions.filter(r => r.field === field);
        addNewReport(newReport[0]);     //Since I use 0 index of newReport is, filter returns an object array which length is always 1.
    }

    const handleClick = () => {
        var node = divRef.current;
        htmlToImage.toPng(node, { backgroundColor: '#FFF' })
            .then((dataUrl) => {
                download(dataUrl, 'report.png');
            });
    }

    return (
        <div className='report-page-root-div' ref={divRef}>
            <div>
                <h1 >Reports for <strong className='text-info'>{form.title}</strong></h1>
            </div>

            <div className='d-flex flex-wrap mw-1000'>
                {report.map((r, index) => {
                    return (<Chart report={r} index={index} />)
                })}

                <div className='new-chart-add-root-div'>
                    <div className='d-flex flex-column'>
                        <select ref={selectRef}>
                            {reportForOptions.map(r => {
                                return <option value={r.field}>{r.title}</option>
                            })}
                        </select>
                        <button onClick={handleAddClick} className="btn btn-outline-success"><svg width="4em" height="4em" viewBox="0 0 16 16" className="bi bi-plus-circle" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" d="M8 3.5a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-.5.5H4a.5.5 0 0 1 0-1h3.5V4a.5.5 0 0 1 .5-.5z" />
                            <path fill-rule="evenodd" d="M7.5 8a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1H8.5V12a.5.5 0 0 1-1 0V8z" />
                            <path fill-rule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                        </svg></button>
                    </div>
                </div>
            </div>
            <button onClick={handleClick}>Click and get url</button>
        </div>

    )
}