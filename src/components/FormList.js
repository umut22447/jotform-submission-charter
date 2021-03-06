import React from 'react'
import { useForms } from '../contexts/FormsContext'
import Form from './Form'

export default function FormList() {
    const { filteredForms } = useForms();

    return (
        <div className="d-flex" onScroll="">
            <ul className="list-group-item mx-auto justify-content-center bg-white border-0 w-50">
                {
                    filteredForms.map(form => {
                        return (
                            <Form
                                title={form.title}
                                formId={form.id}
                                answerCount={form.count}
                                formType={form.type} />
                        )
                    })
                }
            </ul>
        </div>
    )
}
