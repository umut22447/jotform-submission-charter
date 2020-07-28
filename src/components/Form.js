import React from 'react'
import '../Form.css'
import { Link } from 'react-router-dom'


function Form(props) {
    const reportFormId = `/report?formid=${props.formId}`;

    return (
        <div className='form-layout'>
            <div className='form-title-layout'>
                {props.title}
            </div>

            <div className='button-layout'>
                <Link to={reportFormId}><button className='form-button-1'>Show Report Charter</button></Link>
                <Link to="/submission"><button className='form-button-2'>Show Submission</button></Link>
            </div>

        </div>
    )
}

export default Form;