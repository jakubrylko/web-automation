import * as Selectors from './Home.selectors'

export const clickOnNavigationItem = (item: string) => {
  cy.get('nav').contains(item).click()
}

export const clickOnMenuTile = (item: string) => {
  cy.get('h4').contains(item).click()
}

export const clickAllNotifications = () => {
  return Selectors.notification().each(($notification) => {
    cy.wrap($notification)
      .should('have.attr', 'data-status', 'notRead')
      .find('button')
      .click()
  })
}
