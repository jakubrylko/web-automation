import { test } from '@playwright/test'
import { LeftPanelPage } from 'playwright/components/DemoQA/LeftPanel/LeftPanel.page'
import { AlertsAssertion } from 'playwright/pages/DemoQA/Alerts/Alerts.assertion'
import { HomePage } from 'playwright/pages/DemoQA/Homepage/Home.page'

test.describe('Alerts', () => {
  let Home: HomePage
  let LeftPanel: LeftPanelPage
  let Alerts: AlertsAssertion

  test.beforeEach(async ({ page }) => {
    Home = new HomePage(page)
    LeftPanel = new LeftPanelPage(page)
    Alerts = new AlertsAssertion(page)

    await page.goto('/')
    await Home.clickOnMenuCard('Alerts, Frame & Windows')
    await LeftPanel.clickOnMenuItem('Alerts')
  })

  test.afterEach(async () => {
    await Alerts.dismissAlert()
  })

  test('Should display an alert', async () => {
    await Alerts.alertButton.click()
    await Alerts.assertAlertMessage('You clicked a button')
  })

  test('Should display an alert with timer', async ({ page }) => {
    await Alerts.timerAlertButton.click()
    await page.waitForTimeout(5000)
    await Alerts.assertAlertMessage('This alert appeared after 5 seconds')
  })
})
