export const stubWindow = ({ alias }: { alias: string }) => {
  return cy.window().then((window) => {
    cy.stub(window, 'open').as(alias)
  })
}
