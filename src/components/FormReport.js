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
        document.body.classList.add("exporting");
        htmlToImage.toPng(node, { backgroundColor: '#FFF' })
            .then((dataUrl) => {
                download(dataUrl, 'report.png');
                document.body.classList.remove("exporting");
            });
    }

    return (
        <div className='report-page-root-div bg-light' ref={divRef}>
            <div className="d-flex flex-row justify-content-between mt-3" style={{ width: '90%' }}>
                <h1>Reports for <strong className='text-info'>{form.title}</strong></h1>
                <button class="btn btn-primary noexport" onClick={handleClick}> <svg width="2em" height="2em" viewBox="0 0 16 16" class="bi bi-arrow-down" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M4.646 9.646a.5.5 0 0 1 .708 0L8 12.293l2.646-2.647a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 0 1 0-.708z" />
                    <path fill-rule="evenodd" d="M8 2.5a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-1 0V3a.5.5 0 0 1 .5-.5z" />
                </svg>Download Report as PNG</button>
            </div>

            <div className='d-flex flex-wrap mw-1000'>
                {report.map((r, index) => {
                    return (<Chart report={r} index={index} />)
                })}

                <div className='new-chart-add-root-div noexport'>
                    <div className='d-flex flex-column w-100'>
                        <select ref={selectRef} className="form-control form-control-lg">
                            {reportForOptions.map(r => {
                                return <option value={r.field}>{r.title}</option>
                            })}
                        </select>
                        <button onClick={handleAddClick} className="btn btn-outline-success border border-0 h-100"><svg width="4em" height="4em" viewBox="0 0 16 16" className="bi bi-plus-circle" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" d="M8 3.5a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-.5.5H4a.5.5 0 0 1 0-1h3.5V4a.5.5 0 0 1 .5-.5z" />
                            <path fill-rule="evenodd" d="M7.5 8a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1H8.5V12a.5.5 0 0 1-1 0V8z" />
                            <path fill-rule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                        </svg></button>
                    </div>
                </div>
            </div>
        </div>

    )
}