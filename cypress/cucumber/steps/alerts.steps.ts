import { Given, Then, When } from '@badeball/cypress-cucumber-preprocessor'
import * as LeftPanel from 'cypress/components/DemoQA/LeftPanel'
import * as Alerts from 'cypress/screens/DemoQA/Alerts'
import * as Home from 'cypress/screens/DemoQA/Homepage'

Given('I am on the homepage', () => {
  cy.visit('/')
})

When('I navigate to the alerts page', () => {
  Home.clickOnMenuCard('Alerts, Frame & Windows')
  LeftPanel.clickOnMenuItem('Alerts')
})

When('I click the {string} Click me button', () => {})

Then('An alert should appear', () => {
  Alerts.alertButton().click()
  Alerts.assertAlertText('You clicked a button', { window: 'alert' })
})

Then('An alert should appear after 5 seconds', () => {
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

Then('A confirm box should appear', () => {
  Alerts.confirmBoxButton().click()
  Alerts.assertAlertText('Do you confirm action?', { window: 'confirm' })
  Alerts.handleConfirmBox('Approve')
})

Then('I should see a confirmation result', () => {
  Alerts.assertAlertResult('You selected Ok', { window: 'confirm' })
})

const text = 'Testing'
Then('A prompt box should appear', () => {
  Alerts.stubPromptBox(text)
  Alerts.promptBoxButton().click()
})

Then('I should see the result of the prompt', () => {
  Alerts.assertAlertResult(`You entered ${text}`, { window: 'prompt' })
})
