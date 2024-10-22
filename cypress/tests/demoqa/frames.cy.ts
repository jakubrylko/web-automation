import * as Home from 'cypress/screens/DemoQA/Homepage'
import * as LeftPanel from 'cypress/components/DemoQA/LeftPanel'
import * as Frames from 'cypress/screens/DemoQA/Frames'
import { SAMPLE_PAGE } from 'common/test-data'

describe('Frames', () => {
  beforeEach(() => {
    cy.visit('/')
    Home.clickOnMenuCard('Alerts, Frame & Windows')
    LeftPanel.clickOnMenuItem('Frames')
    cy.wait(500)
  })

  it('Should assert large frame', () => {
    Frames.largeFrame().then(($frame) => {
      const header = $frame.contents().find('h1')
      expect(header).contain(SAMPLE_PAGE)
    })
  })

  it('Should assert small frame', () => {
    Frames.smallFrame()
      .its('0.contentDocument.body')
      .shouldHaveText(SAMPLE_PAGE)
  })
})
