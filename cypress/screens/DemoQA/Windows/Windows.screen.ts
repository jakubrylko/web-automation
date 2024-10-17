export const stubWindow = () => {
  cy.window().then((window) => {
    cy.stub(window, 'open').as('window')
  })
}
