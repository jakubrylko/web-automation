import * as Navbar from 'cypress/components/Apptension/Navbar'
import * as Careers from 'cypress/screens/Apptension/Careers'
import * as Home from 'cypress/screens/Apptension/Homepage'
import { isInViewport, isNotInViewport } from 'cypress/support/viewport'

describe('Apptension website', () => {
  it('Should assert if section is in viewport', () => {
    cy.visit(Cypress.env('APPTENSION_URL'))
    Home.closeCookieBanner()
    Navbar.clickOnItem('Careers')

    isNotInViewport(Careers.servicesSection())
    Careers.servicesSection().scrollIntoView()
    isInViewport(Careers.servicesSection())
  })
})
