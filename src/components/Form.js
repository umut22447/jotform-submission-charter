import React, { useState } from 'react'
import '../Form.css'
import { Link } from 'react-router-dom'


function Form(props) {
    const reportFormId = `/report/${props.formId}`;
    const [visibility, setVisibility] = useState(false);

    return (
        <li className='list-group-item' onMouseOver={() => { setVisibility(true) }} onMouseLeave={() => { setVisibility(false) }}>
            <div className='form-group'>

                <div className='form-info-layout' >
                    <strong>{props.title}</strong><br/>
                    {props.answerCount} Form Answer
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