class logIn {
    getFieldUserName = () =>  cy.get("#ctl00_MainContent_username")
    getFieldPassword = () =>  cy.get("#ctl00_MainContent_password")

    getButton = () => cy.get("#ctl00_MainContent_login_button")
    
    getStatus = () => cy.get("#ctl00_MainContent_status")
    
}
export default new logIn()