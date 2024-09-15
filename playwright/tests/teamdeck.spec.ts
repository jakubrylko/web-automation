import { BrowserContext, Page, expect, test } from '@playwright/test'
import { ai } from '@zerostep/playwright'

const { TEAMDECK_URL, TEAMDECK_USERNAME, TEAMDECK_PASSWORD, EMAIL, PASSWORD } =
  process.env

let context: BrowserContext, page: Page

test.describe('Teamdeck', () => {
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

  test('Should login using AI', async () => {
    await ai(
      [
        `Type ${EMAIL} in "Your email" field`,
        `Type ${PASSWORD} in "Password" field`,
        'Click on the "Sign in" button'
      ],
      { page, test }
    )
    await expect(page.locator('canvas')).toBeVisible()
  })
})
