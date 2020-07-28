import React from 'react'
import { useForms } from '../contexts/FormsContext'
import Form from './Form'

export default function FormList() {
    const { forms } = useForms()

    return (
        <div>
            {
                forms.map(form => {
                    return (
                        <Form
                            title={form.title}
                            formId={form.id}/>
                    )
                })
            }
        </div>
    )
}
