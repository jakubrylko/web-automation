import * as Home from 'cypress/screens/DemoQA/Homepage'
import * as LeftPanel from 'cypress/components/DemoQA/LeftPanel'
import * as Modals from 'cypress/screens/DemoQA/Modals'

describe('Modals', () => {
  beforeEach(() => {
    cy.visit('/')
    Home.clickOnMenuCard('Alerts, Frame & Windows')
    LeftPanel.clickOnMenuItem('Modal Dialogs')
  })

  afterEach(() => {
    Modals.modalContent().should('not.exist')
  })

  it('Should assert large modal', () => {
    Modals.largeModalButton().click()
    Modals.assert('Large Modal')
    Modals.closeLargeModal().click()
  })

  it('Should assert small modal', () => {
    Modals.smallModalButton().click()
    Modals.assert('Small Modal')
    Modals.closeSmallModal().click()
  })
})
