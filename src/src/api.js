const apikey = 'b72ff0817511ac73530499828fda7fd6';

export const getUser = () => {
    return fetch(`https://api.jotform.com/user?apikey=${apikey}`)
        .then(response => response.json()).then(r => {
            if (r.responseCode !== 200) {
                return;
            }
            return r.content;
        });
}

export const getForms = () => {
    return fetch(`https://api.jotform.com/user/forms?apikey=${apikey}&limit=1000`)
        .then(response => response.json())
        .then(r => r.content.filter(form => form.status !== "DELETED"));
}

export const getFormById = (formId) => {
    return fetch(`https://api.jotform.com/form/${formId}?apikey=${apikey}`)
    .then(response => response.json())
    .then(response => response.content)
}

export const getSubmissionById = (formId) => {
    return fetch(`https://api.jotform.com/form/${formId}/submissions?apikey=${apikey}`)
    .then(response => response.json())
    .then(r => r.content)
}

export const getSubmissionQuestionsById = (formId) => {
    return fetch(`https://api.jotform.com/form/${formId}/questions?apikey=${apikey}`)
    .then(response => response.json())
    .then(r => r.content)
}