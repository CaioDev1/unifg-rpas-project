/// <reference types="cypress" />

const { describe } = require("node:test");

describe('Auth', () => {
  cy.visit('/login')

  cy.get('[data-testid="email-input"]').type('teste@gmail.com')
  cy.get('[data-testid="password-input"]').type('123456')

  cy.contains('register').click()

  
})