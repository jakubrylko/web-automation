import { BrowserContext, Page, expect, test } from '@playwright/test'
import { getCookies, sendLoginRequest } from 'playwright/support/teamdeck'

const { TEAMDECK_URL, TEAMDECK_USERNAME, TEAMDECK_PASSWORD, EMAIL, PASSWORD } =
  process.env

let context: BrowserContext, page: Page

test.describe('Teamdeck login', () => {
  test.beforeEach(async ({ browser }) => {
    context = await browser.newContext({
      httpCredentials: {
        username: TEAMDECK_USERNAME!,
        password: TEAMDECK_PASSWORD!
      }
    })
  })

  test('Should login to the app with basic auth', async () => {
    page = await context.newPage()
    await page.goto(TEAMDECK_URL!)

    await page.locator('[type="email"]').fill(EMAIL!)
    await page.locator('[type="password"]').fill(PASSWORD!)
    await page.locator('[type="submit"]').click()
    await expect(page.locator('canvas')).toBeVisible()
  })

  test('Should login to the app with cookies', async ({ request }) => {
    const response = await sendLoginRequest(request)
    const cookies = await getCookies(response)
    await context.addCookies(cookies)

    page = await context.newPage()
    await page.goto(TEAMDECK_URL!)
    await expect(page.locator('organization-list')).toBeVisible()
  })
})
