import * as Selectors from './Links.selectors'

export const assertLinks = () => {
  Selectors.link().each(($link) => {
    cy.wrap($link).shouldBeVisible().and('have.attr', 'href')
  })
}
