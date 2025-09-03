/// <reference types="cypress" />



describe('web-order-log-in', () => {
  beforeEach(() => {
cy.visit('http://secure.smartbearsoftware.com/samples/TestComplete12/WebOrders/Login.aspx?ReturnUrl=%2fsamples%2ftestcomplete12%2fweborders%2fDefault.aspx')
  })
  it('Log In', () => {
    cy.fixture("user").then((user) => {
      cy.login(user.email, user.password)
    })    
  })
})