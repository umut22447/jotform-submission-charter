import React, { useState, useEffect, useRef } from 'react';
import Chart from './Chart'
import { useReport } from '../contexts/ReportContext'
import { getDefaultReport, classNames } from '../Util'
import htmlToImage from 'html-to-image';
import download from 'downloadjs'

export default function FormReport() {

    const { form, report, addNewReport, questions } = useReport();
    const [reportForOptions, setReportForOptions] = useState([]);
    const [currentTitle, setCurrentTitle] = useState("Submission Count");
    const [currentDate, setCurrentDate] = useState("All");
    const [currentChart, setCurrentChart] = useState("Pie Chart");
    const [field, setField] = useState("submission-count");         //Add Field
    const [isProappAvailable, setIsProappAvailable] = useState(false);  //To add Product-Appointment section to options menu in new chart add section.
    const [productField, setProductField] = useState();
    const [appointmentField, setAppointmentField] = useState();
    const divRef = useRef();

    useEffect(() => {
        getDefaultReport(form.id).then(setReportForOptions);

        const typeArray = Object.values(questions).map(q => q.type);
        let includeProduct = typeArray.includes("control_payment");
        let includeAppointment = typeArray.includes("control_appointment");
        setIsProappAvailable(includeProduct && includeAppointment);

        Object.keys(questions).forEach(qField => {          //Determine the product and appointment field and send it to chart as prop.
            if (questions[qField].type === "control_payment") {
                setProductField(qField);
            }
            if (questions[qField].type === "control_appointment") {
                setAppointmentField(qField);
            }
        });

    }, [form, questions]);

    const handleAddClick = () => {
        if (field === "submission-count") {
            let submissionCountReport = { "field": "submission-count", "title": "Submission Count", "chartType": "Calendar", "date": "All" };
            addNewReport(submissionCountReport);
        }
        else if (field === "product-appointment") {
            let productAppointmentReport = { "field": "product-appointment", "title": "Product-Appointment", "chartType": "ProductAppointment", "date": "All" };
            addNewReport(productAppointmentReport);
        }
        else if (field === "location-count"){
            let locationCountReport = {"field": "location-count", "title": "Location Count", "chartType": "Location", "date": currentDate === "Last 7 Days" ? "last7days" : currentDate === "Last 3 Months" ? "last3month" : "All"};
            addNewReport(locationCountReport);
        }
        else {
            let newReport = reportForOptions.filter(r => r.field === field);
            newReport[0].date = (currentDate === "Last 7 Days" ? "last7days" : currentDate === "Last 3 Months" ? "last3month" : "All");
            newReport[0].chartType = (currentChart === "Pie Chart" ? "Pie" : currentChart === "Line Chart" ? "Line" : "Bar");
            addNewReport(newReport[0]);     //Since I use 0 index of newReport is, filter returns an object array which length is always 1.
        }
    }

    const handleClick = () => {
        var node = divRef.current;
        document.body.classList.add("exporting");
        htmlToImage.toPng(node, { backgroundColor: 'light' })
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

            <div className='d-flex flex-wrap mw-1735'>
                {report.map((r, index) => {
                    return (<Chart report={r} index={index} productField={productField} appointmentField={appointmentField} />)
                })}

                <div className='new-chart-add-root-div noexport'>
                    <div className='d-flex flex-column w-100'>
                        <div className='d-flex flex-wrap w-100'>
                            <div className="dropdown">
                                <button className="form-report-dropdown-button dropdown-toggle bg-light" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <strong className="text-dark">{currentTitle}</strong>
                                </button>
                                <ul className="dropdown-menu">
                                    {reportForOptions.map(r => {
                                        return <button className="dropdown-item" onClick={() => {
                                            setField(r.field);
                                            setCurrentTitle(r.title);
                                        }}>{r.title}</button>
                                    })}
                                    <button className={classNames("dropdown-item", { "d-none": !isProappAvailable })} onClick={() => {
                                        setField("product-appointment");
                                        setCurrentTitle("ProductAppointment");
                                    }
                                    }>Product-Appointment Chart</button>
                                    <button className="dropdown-item" onClick={() => {
                                        setField("location-count");
                                        setCurrentTitle("Location Count");
                                    }}>Location Count</button>
                                    <button className="dropdown-item" onClick={() => {
                                        setField("submission-count");
                                        setCurrentTitle("Submission Count");
                                    }}>Submission Count</button>
                                </ul>
                            </div>

                            <div className={classNames("dropdown", { "d-none": (field === "submission-count" || field === "product-appointment") })}>
                                <button className="form-report-dropdown-button dropdown-toggle bg-light" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <strong className="text-dark">{currentDate}</strong>
                                </button>
                                <ul className="dropdown-menu">
                                    <button className="dropdown-item" onClick={() => setCurrentDate("All")}>All</button>
                                    <button className="dropdown-item" onClick={() => setCurrentDate("Last 7 Days")}>Last 7 Days</button>
                                    <button className="dropdown-item" onClick={() => setCurrentDate("Last 3 Months")}>Last 3 Months</button>
                                </ul>
                            </div>

                            <div className={classNames("dropdown", { "d-none": (field === "submission-count" || field === "product-appointment" || field === "location-count") })}>
                                <button className="form-report-dropdown-button dropdown-toggle bg-light" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <strong className="text-dark">{currentChart}</strong>
                                </button>
                                <ul className="dropdown-menu">
                                    <button className="dropdown-item" onClick={() => setCurrentChart("Pie Chart")}>Pie Chart</button>
                                    <button className="dropdown-item" onClick={() => setCurrentChart("Line Chart")}>Line Chart</button>
                                    <button className="dropdown-item" onClick={() => setCurrentChart("Bar Chart")}>Bar Chart</button>
                                </ul>
                            </div>
                        </div>


                        <button onClick={handleAddClick} className="btn btn-outline-success border border-0 h-100">
                            <svg width="4em" height="4em" viewBox="0 0 16 16" className="bi bi-plus-circle" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" d="M8 3.5a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-.5.5H4a.5.5 0 0 1 0-1h3.5V4a.5.5 0 0 1 .5-.5z" />
                                <path fill-rule="evenodd" d="M7.5 8a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1H8.5V12a.5.5 0 0 1-1 0V8z" />
                                <path fill-rule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>

    )
}