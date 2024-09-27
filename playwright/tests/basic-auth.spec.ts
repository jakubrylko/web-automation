import { BrowserContext, Page, expect, test } from '@playwright/test'

const { TEAMDECK_URL, TEAMDECK_USERNAME, TEAMDECK_PASSWORD, EMAIL, PASSWORD } =
  process.env

let context: BrowserContext, page: Page

test.describe('Basic auth', () => {
  test.beforeEach(async ({ browser }) => {
    context = await browser.newContext({
      httpCredentials: {
        username: TEAMDECK_USERNAME!,
        password: TEAMDECK_PASSWORD!
      }
    })

    page = await context.newPage()
    await page.goto(TEAMDECK_URL!)
  })

  test('Should login to the app with basic auth', async () => {
    await page.locator('[type="email"]').fill(EMAIL!)
    await page.locator('[type="password"]').fill(PASSWORD!)
    await page.locator('[type="submit"]').click()
    await expect(page.locator('canvas')).toBeVisible()
  })
})
