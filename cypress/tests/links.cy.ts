import * as Home from 'cypress/screens/DemoQA/Homepage'
import * as LeftPanel from 'cypress/components/DemoQA/LeftPanel'
import * as Links from 'cypress/screens/DemoQA/Links'

describe('Practice form', () => {
  it('Should fill and submit practice form', () => {
    cy.visit('/')
    Home.clickOnMenuCard('Elements')
    LeftPanel.clickOnMenuItem('Links')

    Links.countLinks()
    Links.assertLinks()
  })
})
