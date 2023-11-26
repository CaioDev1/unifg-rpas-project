/// <reference types="cypress" />

describe('Auth', () => {
  it('should validate the form fields', () => {
    cy.visit('/register')

    cy.get('input[placeholder*="Digite o nome"]').focus().blur().should('have.attr', 'aria-invalid', 'true')
    cy.contains('Nome é obrigatório').should('exist').and('be.visible')

    cy.get('input[placeholder*="Digite o sobrenome"]').focus().blur().should('have.attr', 'aria-invalid', 'true')
    cy.contains('Sobrenome é obrigatório').should('exist').and('be.visible')

    cy.get('input[placeholder*="Digite o e-mail"]').focus().blur().should('have.attr', 'aria-invalid', 'true')
    cy.contains('email is a required field').should('exist').and('be.visible')

    cy.get('input[placeholder*="Digite o telefone"]').focus().blur().should('have.attr', 'aria-invalid', 'true')
    cy.contains('phone is a required field').should('exist').and('be.visible')

    cy.get('input[placeholder*="Digite a senha"]').focus().blur().should('have.attr', 'aria-invalid', 'true')
    cy.contains('password is a required field').should('exist').and('be.visible')

    cy.get('input[placeholder*="Digite a senha"]').type('123')
    cy.contains('password must be at least 5 characters').should('exist').and('be.visible')
  })

  it('validate unknown login', () => {
    cy.login('emaildesconhecido2@gmail.com', '123456')

    cy.get('.chakra-toast').contains('Email ou senha incorretos').should('exist').and('be.visible')
  })


  it('should sign up succesfully', () => {
    cy.visit('/register')
  
    cy.get('input[placeholder*="Digite o nome"]').type('Teste')
    cy.get('input[placeholder*="Digite o sobrenome"]').type('UNIFG')
    cy.get('input[placeholder*="Digite o e-mail"]').type(`teste_${Math.floor(Math.random() * 50)}@unifg.com`)
    cy.get('input[placeholder*="Digite o telefone"]').type('12345678901')
    cy.get('input[placeholder*="Digite a senha"]').type('123456')

    cy.contains('Termos de Serviço').click()
  
    cy.get('button').contains('Cadastrar').click()

    cy.get('.chakra-toast').contains('Bem-vindo ao R-pas!').should('exist').and('be.visible')
  })


})