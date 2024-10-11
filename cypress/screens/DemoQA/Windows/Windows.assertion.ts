export const assertWindowWasCalled = ({ alias }: { alias: string }) => {
  cy.get(`@${alias}`).should('be.calledOnce')
}

export const assertNewWindowHeader = ({ text }: { text: string }) => {
  cy.visit('/sample')
  cy.get('h1').contains(text)
}
