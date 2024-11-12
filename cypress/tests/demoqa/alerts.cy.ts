import * as LeftPanel from 'cypress/components/DemoQA/LeftPanel'
import * as Alerts from 'cypress/screens/DemoQA/Alerts'
import * as Home from 'cypress/screens/DemoQA/Homepage'

describe('Alerts', () => {
  beforeEach(() => {
    cy.visit('/')
    Home.clickOnMenuCard('Alerts, Frame & Windows')
    LeftPanel.clickOnMenuItem('Alerts')
  })

  it('Should display an alert', () => {
    Alerts.alertButton().click()
    Alerts.assertAlertText('You clicked a button', { type: 'alert' })
  })

  it('Should display an alert with timer', () => {
    let startTime: number

    Alerts.stubAlert()
    Alerts.timerAlertButton()
      .click()
      .then(() => (startTime = Date.now()))

    Alerts.assertAlertWasCalledWith('This alert appeared after 5 seconds').then(
      () => {
        const alertTime = Date.now() - startTime
        expect(alertTime).to.be.within(4800, 5000)
      }
    )
  })

  it('Should display a confirm box', () => {
    const type = 'confirm'

    Alerts.confirmBoxButton().click()
    Alerts.assertAlertText('Do you confirm action?', { type })
    Alerts.handleConfirmBox('Cancel')
    Alerts.assertAlertResult('You selected Cancel', { type })
  })

  it('Should display a prompt box', () => {
    const text = 'Testing'

    Alerts.stubPromptBox(text)
    Alerts.promptBoxButton().click()
    Alerts.assertAlertResult(`You entered ${text}`, { type: 'prompt' })
  })
})
