describe('template spec', () => {

  before(() => {
    Cypress.config('baseUrl', 'https://serverest.dev/')
  })

  it('passes', () => {
    cy.visit('https://example.cypress.io')
  })
})