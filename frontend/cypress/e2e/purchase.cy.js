describe('Purchase', () => {
  beforeEach(() => {
    cy.login('john.doe.update-test@example.com', 'password123')
  })

  it('should purchase an item', () => {
    cy.addItemToCart()

    cy.get('[data-testid="cart-page-btn"]').click()

    cy.wait(1500)

    cy.get('button').contains('Comprar').click()

    cy.get('input[name="creditCardNumber"]').type('1234567890123456')
    cy.get('input[name="expirationDate"]').type('12/25')
    cy.get('input[name="cvv"]').type('123')
    cy.get('input[name="address"]').type('Rua Teste')
    cy.get('input[name="zipCode"]').type('12345678')

    cy.contains('Finalizar Compra').click()

    cy.get('.chakra-toast', {timeout: 2000}).contains('Pedido realizado com sucesso').should('exist').and('be.visible')
  })
})