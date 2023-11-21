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
Cypress.Commands.add('login', (email, password) => {
  cy.visit('/login')

  cy.get('input[placeholder*="Enter Email"]').type(email)
  cy.get('input[placeholder*="Enter password"]').type(password)

  cy.get('.chakra-button').contains('Login').click()
})

Cypress.Commands.add('addItemToCart', () => {
  cy.visit('/')

  cy.get('[data-testid="cloth-dashboard-card"]').first().click()
  cy.get('[data-testid="search-cloth-card-image"]').first().click()

  cy.get('[data-testid="size-btn"]').first().click()

  cy.get('[data-testid="add-to-card-btn"]').click()
})
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