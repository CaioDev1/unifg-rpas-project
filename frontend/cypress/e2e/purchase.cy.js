/// <reference types="cypress" />

describe('Purchase', () => {
  beforeEach(() => {
    cy.login('email_desconhecido2@gmail.com', '123456')
  })

  it('should purchase an item', () => {
    cy.addItemToCart()

    cy.get('[data-testid="cart-page-btn"]').click()
  })
})