/// <reference types="cypress" />

describe('web-order-log-in', () => {
  beforeEach(() => {
    //     Navigate to the login page.
    cy.visit('http://secure.smartbearsoftware.com/samples/TestComplete12/WebOrders/Login.aspx?ReturnUrl=%2fsamples%2ftestcomplete12%2fweborders%2fDefault.aspx')
    cy.login(Cypress.env('USERNAME'), Cypress.env('PASSWORD'))
  })
  it.only('verify that a user can successfully log in with valid credentials', () => {

  })
})