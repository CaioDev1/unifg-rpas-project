/// <reference types="cypress" />

describe('Auth', () => {
  it('should validate the form fields', () => {
    cy.visit('/register')

    cy.get('input[placeholder*="Enter First Name"]').focus().blur().should('have.attr', 'aria-invalid', 'true')
    cy.contains('first name is required').should('exist').and('be.visible')

    cy.get('input[placeholder*="Enter Last Name"]').focus().blur().should('have.attr', 'aria-invalid', 'true')
    cy.contains('last name is required').should('exist').and('be.visible')

    cy.get('input[placeholder*="Enter Email"]').focus().blur().should('have.attr', 'aria-invalid', 'true')
    cy.contains('email is a required field').should('exist').and('be.visible')

    cy.get('input[placeholder*="Enter Phone"]').clear().focus().blur().should('have.attr', 'aria-invalid', 'true')
    cy.contains('phone is a required field').should('exist').and('be.visible')

    cy.get('input[placeholder*="Enter password"]').focus().blur().should('have.attr', 'aria-invalid', 'true')
    cy.contains('password is a required field').should('exist').and('be.visible')

    cy.get('input[placeholder*="Enter password"]').type('123')
    cy.contains('password must be at least 5 characters').should('exist').and('be.visible')
  })

  it('validate unknown login', () => {
    cy.login('email_desconhecido2@gmail.com', '123456')

    cy.get('.chakra-toast').contains('Wrong email or password').should('exist').and('be.visible')
  })


  it('should sign up succesfully', () => {
    cy.visit('/register')
  
    cy.get('input[placeholder*="Enter First Name"]').type('Teste')
    cy.get('input[placeholder*="Enter Last Name"]').type('UNIFG')
    cy.get('input[placeholder*="Enter Email"]').type(`teste_${Math.floor(Math.random() * 50)}@unifg.com`)
    cy.get('input[placeholder*="Enter Phone"]').type('12345678901')
    cy.get('input[placeholder*="Enter password"]').type('123456')
    cy.contains('Privacy Policy').click()
  
    cy.get('button').contains('Register').click()

    cy.get('.chakra-toast').contains('Welcome to R-pas!').should('exist').and('be.visible')
  })


})