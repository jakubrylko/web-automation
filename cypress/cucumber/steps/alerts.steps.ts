import { Given, Then, When } from '@badeball/cypress-cucumber-preprocessor'
import * as LeftPanel from 'cypress/components/DemoQA/LeftPanel'
import * as Alerts from 'cypress/screens/DemoQA/Alerts'
import * as Home from 'cypress/screens/DemoQA/Homepage'

let startTime: number

Given('I am on the alerts page', () => {
  cy.visit('/')
  Home.clickOnMenuCard('Alerts, Frame & Windows')
  LeftPanel.clickOnMenuItem('Alerts')
})

When('I click the {string} Click me button', (button: string) => {
  Alerts.stubAlert()

  button === 'first' && Alerts.alertButton().click()

  button === 'second' &&
    Alerts.timerAlertButton()
      .click()
      .then(() => (startTime = Date.now()))
})

When('I click {string} in the confirm box', (button: string) => {
  const action = button === 'Ok' ? 'Approve' : 'Cancel'
  Alerts.confirmBoxButton().click()
  Alerts.assertAlertText('Do you confirm action?', { type: 'confirm' })
  Alerts.handleConfirmBox(action)
})

When('I type {string} in the prompt box', (text: string) => {
  Alerts.stubPromptBox(text)
  Alerts.promptBoxButton().click()
})

Then('An alert should appear', () => {
  Alerts.assertAlertWasCalledWith('You clicked a button')
})

Then('An alert should appear after 5 seconds', () => {
  Alerts.assertAlertWasCalledWith('This alert appeared after 5 seconds').then(
    () => {
      const alertTime = Date.now() - startTime
      expect(alertTime).to.be.within(4800, 5000)
    }
  )
})

Then('I should see the result - You selected {string}', (button: string) => {
  Alerts.assertAlertResult(`You selected ${button}`, { type: 'confirm' })
})

Then('I should see the result - You entered {string}', (text: string) => {
  Alerts.assertAlertResult(`You entered ${text}`, { type: 'prompt' })
})
