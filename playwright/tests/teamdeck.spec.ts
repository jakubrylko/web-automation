import { expect, test } from '@playwright/test'
import { ai } from '@zerostep/playwright'

const { TEAMDECK_URL, TEAMDECK_USERNAME, TEAMDECK_PASSWORD, EMAIL, PASSWORD } =
  process.env

test.describe('Teamdeck', () => {
  test('Should login using AI', async ({ browser }) => {
    const context = await browser.newContext({
      httpCredentials: {
        username: TEAMDECK_USERNAME!,
        password: TEAMDECK_PASSWORD!
      }
    })

    const page = await context.newPage()
    const aiArgs = { page, test }
    await page.goto(TEAMDECK_URL!)

    await ai(
      [
        `Type ${EMAIL} in the email field`,
        `Type ${PASSWORD} in the password field`,
        'Click on the submit button'
      ],
      aiArgs
    )
  })
})
