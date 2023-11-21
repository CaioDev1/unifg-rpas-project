/// <reference types="cypress" />

describe('Cart', () => {
  beforeEach(() => {
    cy.login('email_desconhecido2@gmail.com', '123456')
  })

  it('should validate cart flow', () => {
    cy.get('[data-testid="home-page-btn"]').click()
    // cy.visit('/')

    cy.get('[data-testid="cloth-dashboard-card"]').first().click()
    
    cy.get('[data-testid="search-cloth-card-image"]').first().click()

    cy.get('[data-testid="add-to-card-btn"]').click()

    cy.get('.chakra-toast').contains('You must choose a size').should('exist').and('be.visible')

    cy.get('[data-testid="size-btn"]').contains('M').click()

    cy.get('[data-testid="add-to-card-btn"]').click()
    cy.get('[data-testid="add-to-card-btn"]').should('not.exist')
  })
})