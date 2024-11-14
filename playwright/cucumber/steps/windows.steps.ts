import { MESSAGE_TEXT, SAMPLE_PAGE } from '@common/test-data'
import { Before, Given, Then, When } from '@cucumber/cucumber'
import { Page } from '@playwright/test'
import { LeftPanelPage } from 'playwright/components/DemoQA/LeftPanel/LeftPanel.page'
import { HomePage } from 'playwright/pages/DemoQA/Homepage/Home.page'
import { WindowsAssertion } from 'playwright/pages/DemoQA/Windows/Windows.assertion'
import { fixture } from '../hooks/fixture'

let Home: HomePage
let LeftPanel: LeftPanelPage
let Windows: WindowsAssertion
let newWindow: Page

Before(async () => {
  Home = new HomePage(fixture.page)
  LeftPanel = new LeftPanelPage(fixture.page)
  Windows = new WindowsAssertion(fixture.page)
})

Given('I am on the windows page', async () => {
  await fixture.page.goto('https://demoqa.com')
  await Home.clickOnMenuCard('Alerts, Frame & Windows')
  await LeftPanel.clickOnMenuItem('Browser Windows')
})

When('I click the {string} button', async (button: ButtonIdentifier) => {
  const buttons = {
    first: Windows.tabButton,
    second: Windows.windowButton,
    third: Windows.msgWindowButton
  }
  newWindow = await Windows.openNewWindow(buttons[button])
})

Then('A new {string} should open', async (window: string) => {
  void window
  await newWindow.waitForLoadState()
  await Windows.assertNumOfPages(2)
})

Then('I should see the heading text', async () => {
  await Windows.assertNewWindowHeader(newWindow, { text: SAMPLE_PAGE })
})

Then('I should see the message text', async () => {
  await Windows.assertNewWindowBody(newWindow, { text: MESSAGE_TEXT })
})
