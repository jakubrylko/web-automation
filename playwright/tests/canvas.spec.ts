import { BrowserContext, Page, expect, test } from '@playwright/test'
import { getBookingCoordinates } from 'playwright/support/canvas'

const { TEAMDECK_URL, TEAMDECK_USERNAME, TEAMDECK_PASSWORD, EMAIL, PASSWORD } =
  process.env

let context: BrowserContext, page: Page

test.describe('Canvas', () => {
  test.beforeEach(async ({ browser }) => {
    context = await browser.newContext({
      httpCredentials: {
        username: TEAMDECK_USERNAME!,
        password: TEAMDECK_PASSWORD!
      }
    })

    page = await context.newPage()
    await page.goto(TEAMDECK_URL!)
    await page.locator('[type="email"]').fill(EMAIL!)
    await page.locator('[type="password"]').fill(PASSWORD!)
    await page.locator('[type="submit"]').click()
  })

  test('Should interact with canvas', async () => {
    await expect(page.locator('canvas')).toBeVisible()

    const booking = await getBookingCoordinates(page)
    await page.mouse.move(booking.x, booking.y)
    await page.waitForTimeout(1000)
    await page.mouse.click(booking.x, booking.y)

    await expect(page.getByText('New booking')).toBeVisible()
  })
})
