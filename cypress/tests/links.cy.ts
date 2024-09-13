/// <reference types="Cypress" />

import { LINK } from '@common/selectors/links'

describe('Practice form', () => {
  it('Should fill and submit practice form', () => {
    cy.visit('https://demoqa.com')

    cy.contains('Elements').click()
    cy.contains('Links').click()

    cy.get(LINK)
      .its('length')
      .then((numOfLinks) => {
        cy.log(`Number of links: ${numOfLinks}`)
      })

    cy.get(LINK).each(($link) => {
      cy.wrap($link).should('be.visible').and('have.attr', 'href')
    })
  })
})
