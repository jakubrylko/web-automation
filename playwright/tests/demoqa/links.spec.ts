import { test } from '@playwright/test'
import { LeftPanelPage } from 'playwright/components/DemoQA/LeftPanel/LeftPanel.page'
import { HomePage } from 'playwright/pages/DemoQA/Homepage/Home.page'
import { LinksAssertion } from 'playwright/pages/DemoQA/Links/Links.assertion'

test.describe('Links', () => {
  test('Should assert all links', async ({ page }) => {
    const Home = new HomePage(page)
    const LeftPanel = new LeftPanelPage(page)
    const Links = new LinksAssertion(page)

    await page.goto('/')
    await Home.clickOnMenuCard('Elements')
    await LeftPanel.clickOnMenuItem('Links')
    await Links.assertLinks()
  })
})
