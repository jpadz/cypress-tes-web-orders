/// <reference types="cypress" />
import logInPage from "../pages/logInPage"


describe('web-order-log-in', () => {
  beforeEach(() => {
    //     Navigate to the login page.
    cy.visit('http://secure.smartbearsoftware.com/samples/TestComplete12/WebOrders/Login.aspx?ReturnUrl=%2fsamples%2ftestcomplete12%2fweborders%2fDefault.aspx')
  })
  it('verify that a user can successfully log in with valid credentials', () => {
    cy.login(Cypress.env('USERNAME'), Cypress.env('PASSWORD'))
    //The user is redirected to Default.aspx.
    cy.get('#aspnetForm').should('have.attr', 'action', 'Default.aspx');   
  })
  it('verify the system handles invalid credentials correctly without crashing and provides appropriate feedback.', () => {
    //Invalid Username
    cy.login('InvalidUser', Cypress.env('PASSWORD'))
   // A generic error message (e.g., "Invalid Login or Password.") should appear in the <span class="error"> element above the form.
    logInPage.getStatus().should("have.text","Invalid Login or Password.")
  })
  it('Invalid Password', () => {
//     Navigate to the login page.

    cy.login(Cypress.env('USERNAME'), 'wrongpassword')
   // A generic error message (e.g., "Invalid Login or Password.") should appear in the <span class="error"> element above the form.
    logInPage.getStatus().should("have.text","Invalid Login or Password.")
  })
  it('Both Fields Invalid', () => {
//     Navigate to the login page.
    cy.login('FakeUser123', 'FakePass456')
// A generic error message (e.g., "Invalid Login or Password.") should appear in the <span class="error"> element above the form.
    logInPage.getStatus().should("have.text","Invalid Login or Password.")
  })
  it('verify the system validates the presence of required fields before submission', () => {
    //     Empty Username
    //     Navigate to the login page.

    // Leave the "Username" field blank.
    logInPage.getFieldUserName().should('be.empty')

    // In the "Password" field, enter: test
    logInPage.getFieldPassword().type('test')

    // Click the "Login" button.
    logInPage.getButton().click()
    //The form should not submit.
    cy.get('#aspnetForm').should('be.visible')
    //The cursor should focus on the username field.
    logInPage.getFieldUserName().should('be.focused')
    // A generic error message (e.g., "Invalid Login or Password.") should appear in the <span class="error"> element above the form.
    logInPage.getStatus().should("have.text","Invalid Login or Password.")

    //     Empty Password
    //     Navigate to the login page.

    // In the "Username" field, enter: Tester
    logInPage.getFieldUserName().type(Cypress.env('USERNAME'))

    // Leave the "Password" field blank.
    logInPage.getFieldPassword().should('be.empty')

    // Click the "Login" button.
    logInPage.getButton().click()
    //username should empty
    logInPage.getFieldUserName().clear()
    //The form should not submit.
    cy.get('#aspnetForm').should('be.visible')
 // A generic error message (e.g., "Invalid Login or Password.") should appear in the <span class="error"> element above the form.
    logInPage.getStatus().should("have.text","Invalid Login or Password.")

    //     Both Fields Empty
    //     Navigate to the login page.

    // Ensure both the "Username" and "Password" fields are blank.
    logInPage.getFieldUserName().should('be.empty')
    logInPage.getFieldPassword().should('be.empty')

    // Click the "Login" button.
    logInPage.getButton().click()
    //The form should not submit.
    cy.get('#aspnetForm').should('be.visible')
 // A generic error message (e.g., "Invalid Login or Password.") should appear in the <span class="error"> element above the form.
    logInPage.getStatus().should("have.text","Invalid Login or Password.")
  })
  it('ensure the password field obscures the input text', () => {
    //     Password Obfuscation
    //     Navigate to the login page.
    // Click into the "Password" field.
    logInPage.getFieldPassword().click()
    // Type any characters (e.g., test).
    logInPage.getFieldPassword().type(Cypress.env('PASSWORD'))
    //The entered characters are obscured (displayed as bullets or asterisks • or *), not as plain text.
    logInPage.getFieldPassword().should('have.attr', 'type', 'password');
  })
  it('verify the UI elements conform to their specified design and constraints.', () => {
    //Field Attributes
    //     Username field has type="text".
    logInPage.getFieldUserName().should('have.attr', 'type', 'text')
    // Password field has type="password".
    logInPage.getFieldPassword().should('have.attr', 'type', 'password')

    // Both fields have class="txt" and style="width:142px" applied.
    logInPage.getFieldUserName().should('have.attr', 'class', 'txt').and('have.attr', 'style', 'width:142px')
    logInPage.getFieldPassword().should('have.attr', 'class', 'txt').and('have.attr', 'style', 'width:142px')

    // Button Attributes
    // The button has type="submit",
    logInPage.getButton().should('have.attr', 'type', 'submit')
    //  value="Login", 
    logInPage.getButton().should('have.attr', 'value', 'Login')
    //  and class="button"
    logInPage.getButton().should('have.attr', 'class', 'button')
  })
  it('verify the page loads correctly and the cursor focus is set appropriately.', () => {
    //Autofocus on Username Field
    logInPage.getFieldUserName().should('be.focused')
  })
  it('test alternative methods of submitting the form.', () => {
    //     Keyboard Submission (Enter Key)
    //     Navigate to the login page.
    // In the "Username" field, enter: Tester.
    logInPage.getFieldUserName().type(Cypress.env('USERNAME'))
    // Press the Tab key to move to the "Password" field.
    cy.press(Cypress.Keyboard.Keys.TAB)
    // Enter: test.
    logInPage.getFieldPassword().type(Cypress.env('PASSWORD'))
    // Press the Enter key on the keyboard.
    logInPage.getButton().type('{enter}')
    //The form submits successfully, and the user is logged in and redirected (same expected result as Test Case 1.1).
    cy.get('#aspnetForm').should('have.attr', 'action', 'Default.aspx');
  })
  it('verify that all static text and help information are displayed correctly.', () => {
    //     Help Text Visibility
    //     Navigate to the login page.
    // Read the information at the bottom of the login box.
    // The text "In order to log in Orders sample use the following information:" is visible,
    cy.get('.info').should('contain.text', 'In order to log in Orders sample use the following information:').and('be.visible')
    // followed by the correct username and password instructions centered on the page: "Username - Tester" and "Password - test".
    cy.get('.info').contains('Username - Tester').and('be.visible')
    cy.get('.info').contains('Password - test').and('be.visible')
  })
  it('verify the visual presentation of the login form is as intended.', () => {
    // CSS Styling
    // The form is styled. The labels and inputs are aligned. The styles from the linked stylesheet (StyleSheet.css) are applied correctly 
    cy.get('head > link').should('have.attr', 'href', 'App_Themes/Default/StyleSheet.css')
    // (e.g., .txt,
    logInPage.getFieldUserName().should('have.attr', 'class', 'txt')
    //  .button, 
    logInPage.getButton().should('have.attr', 'class', 'button')
    // .error classes).
    logInPage.getStatus().should('have.attr', 'class', 'error')
  })
  it(' ensure critical hidden fields for the ASP.NET framework are present and correctly passed with the form submission', () => {
//     Presence of Hidden Fields
//     Navigate to the login page.
// View the page source.
// The three hidden input fields are present in the HTML:
// __VIEWSTATE
cy.get('#__VIEWSTATE').should('have.attr', 'name', '__VIEWSTATE')
// __VIEWSTATEGENERATOR
cy.get('#__VIEWSTATEGENERATOR').should('have.attr', 'name', '__VIEWSTATEGENERATOR')
// __EVENTVALIDATION
cy.get('#__EVENTVALIDATION').should('have.attr', 'name', '__EVENTVALIDATION')
  })
})
