describe('Windows', () => {
  it('Should open new window and assert header', () => {
    cy.visit('https://demoqa.com')

    cy.contains('Alerts, Frame & Windows').click()
    cy.contains('Browser Windows').click()

    cy.window().then(($win) => {
      cy.stub($win, 'open').as('New window')
      cy.get('#windowButton').click()
      cy.get('@New window').should('be.calledOnce')
    })

    cy.visit('https://demoqa.com/sample')
    cy.get('h1').contains('This is a sample page')
  })
})
