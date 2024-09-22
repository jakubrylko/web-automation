import { BrowserContext, Page, expect, test } from '@playwright/test'
import {
  calculateCoordinateX,
  calculateCoordinateY
} from 'playwright/support/canvas'

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

    const newBooking = { x: 430, y: 350 }
    const newBookingX = await calculateCoordinateX(page, newBooking.x)
    const newBookingY = await calculateCoordinateY(page, newBooking.y)

    await page.mouse.move(newBookingX, newBookingY)
    await page.mouse.click(newBookingX, newBookingY)
    await expect(page.getByText('New booking')).toBeVisible()
  })
})
