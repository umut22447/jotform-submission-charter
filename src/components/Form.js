import React, { useState } from 'react'
import '../Form.css'
import { Link } from 'react-router-dom'


function Form(props) {
    const reportFormId = `/report/${props.formId}`;
    const [visibility, setVisibility] = useState(false);

    return (
        <li className='list-group-item bg-light m-3 border border-gray rounded' onMouseOver={() => { setVisibility(true) }} onMouseLeave={() => { setVisibility(false) }}>
            <div className='form-group'>
                <div>
                    {
                        props.formType === "LEGACY" ? <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-file-earmark-text" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path d="M4 1h5v1H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V6h1v7a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2z" />
                            <path d="M9 4.5V1l5 5h-3.5A1.5 1.5 0 0 1 9 4.5z" />
                            <path fill-rule="evenodd" d="M5 11.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5zm0-2a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm0-2a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5z" />
                        </svg> : <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-card-text" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" d="M14.5 3h-13a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h13a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13z" />
                                <path fill-rule="evenodd" d="M3 5.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zM3 8a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 8zm0 2.5a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5z" />
                            </svg>
                    }


                    <strong>{props.title}</strong><br />
                    <p className="text-secondary">{props.answerCount} Form Answer </p>

                </div>


                {
                    visibility ?
                        <div className='btn-group'>
                            <Link to={reportFormId}><button className='btn btn-outline-primary'>Show Report Charter</button></Link>
                            <Link to="/submission"><button className='btn btn-outline-secondary'>Show Submission</button></Link>
                        </div> : null
                }

            </div>

        </li>
    )
}

export default Form;