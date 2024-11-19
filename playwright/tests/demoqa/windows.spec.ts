import { MESSAGE_WINDOW, SAMPLE_PAGE } from '@common/test-data'
import { test } from '@playwright/test'
import { LeftPanelPage } from 'playwright/components/DemoQA/LeftPanel/LeftPanel.page'
import { HomePage } from 'playwright/pages/DemoQA/Homepage/Home.page'
import { WindowsAssertion } from 'playwright/pages/DemoQA/Windows/Windows.assertion'

test.describe('Windows', () => {
  let Home: HomePage
  let LeftPanel: LeftPanelPage
  let Windows: WindowsAssertion

  test.beforeEach(async ({ page }) => {
    Home = new HomePage(page)
    LeftPanel = new LeftPanelPage(page)
    Windows = new WindowsAssertion(page)

    await page.goto('/')
    await Home.clickOnMenuCard('Alerts, Frame & Windows')
    await LeftPanel.clickOnMenuItem('Browser Windows')
  })

  test.afterEach(async ({ page }) => {
    await page.bringToFront()
    await Windows.assertBrowserWindowsHeader()
  })

  test('Should open new tab', async () => {
    const { tabButton } = Windows

    const newTab = await Windows.openNewWindow(tabButton)
    await newTab.waitForLoadState()

    await Windows.assertNewWindowHeader(newTab, { text: SAMPLE_PAGE })
  })

  test('Should open new window', async () => {
    const { windowButton } = Windows

    const newWindow = await Windows.openNewWindow(windowButton)
    await newWindow.waitForLoadState()

    await Windows.assertNewWindowHeader(newWindow, { text: SAMPLE_PAGE })
  })

  test('Should open new message window', async () => {
    const { msgWindowButton } = Windows

    const newMsgWindow = await Windows.openNewWindow(msgWindowButton)
    await newMsgWindow.waitForLoadState()

    await Windows.assertNewWindowBody(newMsgWindow, { text: MESSAGE_WINDOW })
  })
})
