import * as LeftPanel from 'cypress/components/DemoQA/LeftPanel'
import * as Home from 'cypress/screens/DemoQA/Homepage'
import * as Links from 'cypress/screens/DemoQA/Links'

describe('Practice form', () => {
  it('Should assert all links', () => {
    cy.visit('/')
    Home.clickOnMenuCard('Elements')
    LeftPanel.clickOnMenuItem('Links')

    Links.countLinks()
    Links.assertLinks()
  })
})
