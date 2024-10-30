import { BrowserContext, Page, test } from '@playwright/test'
import { HomeAssertion } from 'playwright/pages/Teamdeck/Homepage/Home.assertion'
import { LoginPage } from 'playwright/pages/Teamdeck/Login/Login.page'

const { TEAMDECK_URL, TEAMDECK_USERNAME, TEAMDECK_PASSWORD, EMAIL, PASSWORD } =
  process.env

const BASIC_AUTH = {
  httpCredentials: {
    username: TEAMDECK_USERNAME!,
    password: TEAMDECK_PASSWORD!
  }
}

test.describe('Calendar', () => {
  let context: BrowserContext
  let page: Page
  let Home: HomeAssertion
  let Login: LoginPage

  test.beforeAll(async ({ browser }) => {
    context = await browser.newContext(BASIC_AUTH)
    page = await context.newPage()
    Home = new HomeAssertion(page)
    Login = new LoginPage(page)
  })

  test.beforeEach(async () => {
    await page.goto(TEAMDECK_URL!)
    await Login.signIn({ email: EMAIL!, password: PASSWORD! })

    await Home.assertInputDate()
    await Home.datepicker.click()
    await Home.assert.shouldBeVisible(Home.calendar)
  })

  test('Should select date with timestamp', async () => {
    const offsetDays = 2

    await Home.selectDateByTimestamp({ offsetDays })
    await Home.assertInputDate({ offsetDays })
  })

  test('Should select date with aria label', async () => {
    const offsetDays = 0

    await Home.selectDateByAriaLabel({ offsetDays })
    await Home.assertInputDate({ offsetDays })
  })
})
