import { BrowserContext, Page, test } from '@playwright/test'
import { HomeAssertion } from 'playwright/pages/Teamdeck/Homepage/Home.assertion'
import {
  BASIC_AUTH,
  LoginPage
} from 'playwright/pages/Teamdeck/Login/Login.page'

const { EMAIL, PASSWORD } = process.env
const credentials = { email: EMAIL!, password: PASSWORD! }

test.describe('Calendar', () => {
  let context: BrowserContext
  let page: Page
  let Login: LoginPage
  let Home: HomeAssertion

  test.beforeAll(async ({ browser }) => {
    context = await browser.newContext(BASIC_AUTH)
    page = await context.newPage()
    Login = new LoginPage(page)
    Home = new HomeAssertion(page)
  })

  test.beforeEach(async () => {
    await context.clearCookies()
    await Login.open()
    await Login.signIn(credentials)

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
