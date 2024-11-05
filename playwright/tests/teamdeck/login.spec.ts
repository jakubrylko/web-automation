import { BrowserContext, Page, test } from '@playwright/test'
import { TeamdeckAPIAssertion } from 'playwright/api/Teamdeck/Teamdeck.assertion.api'
import { HomeSelectors } from 'playwright/pages/Teamdeck/Homepage/Home.selectors'
import {
  BASIC_AUTH,
  LoginPage
} from 'playwright/pages/Teamdeck/Login/Login.page'

const { EMAIL, PASSWORD } = process.env

test.describe('Teamdeck login', () => {
  let context: BrowserContext
  let page: Page
  let Login: LoginPage
  let Home: HomeSelectors

  test.beforeAll(async ({ browser }) => {
    context = await browser.newContext(BASIC_AUTH)
    page = await context.newPage()
    Login = new LoginPage(page)
    Home = new HomeSelectors(page)
  })

  test('Should login to the app with basic auth', async () => {
    await Login.open()
    await Login.signIn({ email: EMAIL!, password: PASSWORD! })
    await Home.assert.shouldBeVisible(Home.canvas)
  })

  test('Should login to the app using cookies', async ({ request }) => {
    const TeamdeckAPI = new TeamdeckAPIAssertion(request)

    const response = await TeamdeckAPI.login()
    const cookies = await TeamdeckAPI.getCookies(response)
    await context.addCookies(cookies)

    await Login.open()
    await Home.assert.shouldBeVisible(Home.organizationList)
  })
})
