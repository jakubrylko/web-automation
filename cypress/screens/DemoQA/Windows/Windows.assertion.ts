export const assertWindowWasCalled = () => {
  cy.get('@window').should('be.calledOnce')
}

export const assertNewWindowHeader = ({ text }: { text: string }) => {
  cy.visit('/sample')
  cy.get('h1').contains(text)
}
