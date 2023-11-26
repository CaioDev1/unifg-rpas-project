describe('Cart', () => {
  beforeEach(() => {
    cy.login('emaildesconhecido2@gmail.com', '123456')
  })

  it('should validate cart flow', () => {
    cy.get('[data-testid="home-page-btn"]').click()

    cy.get('[data-testid="cloth-dashboard-card"]').first().click()
    
    cy.get('[data-testid="search-cloth-card-image"]').first().click()

    cy.get('[data-testid="add-to-card-btn"]').click()

    cy.get('.chakra-toast').contains('Você deve escolher um tamanho').should('exist').and('be.visible')

    cy.get('[data-testid="size-btn"]').contains('M').click()

    cy.get('[data-testid="add-to-card-btn"]').click()
    cy.get('[data-testid="add-to-card-btn"]').should('not.exist')
  })
})