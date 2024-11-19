import { MESSAGE_WINDOW, SAMPLE_PAGE } from '@common/test-data'
import * as LeftPanel from 'cypress/components/DemoQA/LeftPanel'
import * as Home from 'cypress/screens/DemoQA/Homepage'
import * as Windows from 'cypress/screens/DemoQA/Windows'

describe('Windows', () => {
  beforeEach(() => {
    cy.visit('/')
    Home.clickOnMenuCard('Alerts, Frame & Windows')
    LeftPanel.clickOnMenuItem('Browser Windows')
  })

  it('Should open new tab', () => {
    Windows.stubWindow()
    Windows.tabButton().click()
    Windows.assertWindowWasCalled()

    cy.visit('/sample')
    Windows.assertNewWindowHeader({ text: SAMPLE_PAGE })
  })

  it('Should open new window', () => {
    Windows.stubWindow()
    Windows.windowButton().click()
    Windows.assertWindowWasCalled()

    Windows.navigateToNewWindow()
    Windows.assertNewWindowHeader({ text: SAMPLE_PAGE })
  })

  it('Should open new message window', () => {
    Windows.handleMessageWindow()
    Windows.msgWindowButton().click()
    Windows.assertWindowWasCalled()
    Windows.assertNewWindowBody({ text: MESSAGE_WINDOW })
  })
})
