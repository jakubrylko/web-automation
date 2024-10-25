export const stubAlert = () => {
  cy.window().then((window) => {
    cy.stub(window, 'alert').as('alert')
  })
}

export const handleConfirmBox = (action: 'Approve' | 'Deny') => {
  cy.on('window:confirm', () => {
    return action === 'Approve' ? true : false
  })
}

export const stubPromptBox = (text: string) => {
  cy.window().then((window) => {
    cy.stub(window, 'prompt').returns(text)
  })
}
