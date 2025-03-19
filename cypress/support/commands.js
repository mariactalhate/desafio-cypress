// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --


// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
Cypress.Commands.add('getByAttr', (object, attribute, value) => { 
    cy.get(`${object}[${attribute}="${value}"]`)
})

Cypress.Commands.add('dataGenerator', () =>{
    const randomString = Math.random().toString(36).substring(2, 15)
    const data = {
        "nome": "Nome teste",
        "email": `${randomString}@gmail.com`,
        "password": "SenhaSuperDificil!",
        "administrador": "false"
    } 
    return data
})

Cypress.Commands.add('makeRequest', (method, url, body, headers = {}) => {
    cy.request({
        method: method,
        url: url,
        body: body,
        headers: headers,
        failOnStatusCode: false
    })
})

Cypress.Commands.add('returnUserId', () => {
    cy.dataGenerator().then(data =>{
        cy.makeRequest('POST', '/usuarios', data).then(response =>{
            const id = response.body._id
            return id
        })
    })
})

