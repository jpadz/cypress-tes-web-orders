/// <reference types="cypress" />

describe('web-order-list-of-all-orders', () => {
  beforeEach(() => {
     cy.visit('http://secure.smartbearsoftware.com/samples/TestComplete12/WebOrders/Login.aspx?ReturnUrl=%2fsamples%2ftestcomplete12%2fweborders%2fDefault.aspx')
    cy.fixture("user").then((user) => {
      cy.login(user.email, user.password)
    })
   })
   it(' Verify Order Data Grid Display', () => {
    // Verify Grid Loads
    // 1. Log in to the application. 2. Navigate to the "View all orders" page (Default.aspx).
    // it sets in beforeEach function
    //The orders data grid is displayed with columns: Checkbox, Name, Product, #, Date, Street, City, State, Zip, Card, Card Number, Exp, and an Edit button.


  
  })
})