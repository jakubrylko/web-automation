import { SAMPLE_TEXT } from 'common'
import * as Home from 'cypress/screens/DemoQA/Homepage'
import * as LeftPanel from 'cypress/components/DemoQA/LeftPanel'
import * as Windows from 'cypress/screens/DemoQA/Windows'

describe('Windows', () => {
  it('Should open new window and assert header', () => {
    cy.visit('/')
    Home.clickOnMenuCard('Alerts, Frame & Windows')
    LeftPanel.clickOnMenuItem('Browser Windows')

    Windows.stubWindow({ alias: 'newWindow' })
    Windows.windowButton().click()
    Windows.assertWindowWasCalled({ alias: 'newWindow' })
    Windows.assertNewWindowHeader({ text: SAMPLE_TEXT })
  })
})
