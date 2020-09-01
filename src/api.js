import { api } from './contexts/AuthContext'

export const getUser = (apikey) => {
    return fetch(`https://api.jotform.com/user?apikey=${apikey}`)
        .then(response => response.json()).then(r => {
            if (r.responseCode !== 200) {
                return;
            }
            return r.content;
        });
}

export const getForms = () => {
    return fetch(`https://api.jotform.com/user/forms?apikey=${api.key}&limit=1000`)
        .then(response => response.json())
        .then(r => r.content.filter(form => form.status !== "DELETED"));
}

export const getFormById = (formId) => {
    return fetch(`https://api.jotform.com/form/${formId}?apikey=${api.key}`)
        .then(response => response.json())
        .then(response => response.content)
}

export const getSubmissionById = (formId) => {
    return fetch(`https://api.jotform.com/form/${formId}/submissions?apikey=${api.key}&orderby=created_at,asc&limit=1000`)
        .then(response => response.json())
        .then(r => r.content)
}

export const getSubmissionQuestionsById = (formId) => {
    return fetch(`https://api.jotform.com/form/${formId}/questions?apikey=${api.key}`)
        .then(response => response.json())
        .then(r => r.content)
}

export const getLocationByIP = (ipAddress) => {
    return fetch(`http://ip-api.com/json/${ipAddress}`);
}