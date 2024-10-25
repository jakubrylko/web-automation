import * as Selectors from './Links.selectors'

export const countLinks = () => {
  Selectors.link()
    .its('length')
    .then((numOfLinks) => {
      cy.log(`Number of links: ${numOfLinks}`)
    })
}
