export const stubWindow = () => {
  cy.window().then((window) => cy.stub(window, 'open').as('window'))
}

export const navigateToNewWindow = () => {
  cy.window().then((window) => (window.location.href = '/sample'))
}

export const handleMessageWindow = () => {
  cy.window().then((window) => {
    const open = window.open

    cy.stub(window, 'open')
      .as('window')
      .callsFake((url) => {
        return open.call(window, url, '_self')
      })
  })
}
