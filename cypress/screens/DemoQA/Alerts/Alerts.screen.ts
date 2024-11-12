export const stubAlert = () => {
  cy.window().then((window) => cy.stub(window, 'alert').as('alert'))
}

export const handleConfirmBox = (action: Action) => {
  cy.on('window:confirm', () => {
    return action === 'Ok' ? true : false
  })
}

export const stubPromptBox = (text: string) => {
  cy.window().then((window) => cy.stub(window, 'prompt').returns(text))
}
