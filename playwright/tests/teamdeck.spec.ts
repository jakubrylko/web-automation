import { BrowserContext, Page, test } from '@playwright/test'
import { TeamdeckAPIPage } from 'playwright/api/Teamdeck/Teamdeck.api.page'
import { HomeSelectors } from 'playwright/pages/Teamdeck/Homepage/Home.selectors'
import { LoginPage } from 'playwright/pages/Teamdeck/Login/Login.page'

const { TEAMDECK_URL, TEAMDECK_USERNAME, TEAMDECK_PASSWORD, EMAIL, PASSWORD } =
  process.env

const BASIC_AUTH = {
  httpCredentials: {
    username: TEAMDECK_USERNAME!,
    password: TEAMDECK_PASSWORD!
  }
}

test.describe('Teamdeck login', () => {
  let context: BrowserContext
  let page: Page
  let Home: HomeSelectors

  test.beforeAll(async ({ browser }) => {
    context = await browser.newContext(BASIC_AUTH)
    page = await context.newPage()
    Home = new HomeSelectors(page)
  })

  test('Should login to the app with basic auth', async () => {
    const Login = new LoginPage(page)

    await page.goto(TEAMDECK_URL!)
    await Login.signIn({ email: EMAIL!, password: PASSWORD! })
    await Home.assert.shouldBeVisible(Home.canvas)
  })

  test('Should login to the app using cookies', async ({ request }) => {
    const TeamdeckAPI = new TeamdeckAPIPage(request)

    const response = await TeamdeckAPI.login()
    const cookies = await TeamdeckAPI.getCookies(response)
    await context.addCookies(cookies)

    await page.goto(TEAMDECK_URL!)
    await Home.assert.shouldBeVisible(Home.organizationList)
  })
})
