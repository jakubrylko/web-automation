import { test, expect } from '@playwright/test'
import { fillStripeField } from 'playwright/support/iframe'
import {
  EMAIL_INPUT,
  PASSWORD_INPUT,
  SUBMIT_BTN,
  NAME_INPUT,
  TOAST_MSG,
  TRASH_ICON
} from '@common/selectors/iframe'

const { SAAS_URL, SAAS_USERNAME, SAAS_PASSWORD, EMAIL, PASSWORD } = process.env

test.describe('iFrame task', () => {
  const NAME = 'JR Test'
  const CARD_NUMBER = '4242424242424242'
  const YEAR = '1030'
  const CVC = '123'

  test('Should fill card details in iframe', async ({ browser }) => {
    const context = await browser.newContext({
      httpCredentials: {
        username: SAAS_USERNAME!,
        password: SAAS_PASSWORD!
      }
    })

    const page = await context.newPage()
    await page.goto(SAAS_URL!)

    await page.locator(EMAIL_INPUT).fill(EMAIL!)
    await page.locator(PASSWORD_INPUT).fill(PASSWORD!)
    await page.locator(SUBMIT_BTN).click()

    await page.getByText('Payments').first().click()
    await page.getByText('$5').click({ force: true })
    await page.locator(NAME_INPUT).fill(NAME)

    await fillStripeField(page, 0, CARD_NUMBER)
    await fillStripeField(page, 1, YEAR)
    await fillStripeField(page, 2, CVC)
    await page.getByText('Pay 5 USD').click()

    await expect(page.getByTestId(TOAST_MSG)).toBeVisible()
    await expect(page.getByTestId(TOAST_MSG)).toBeHidden()

    await page.getByText('Payments').first().click()
    await expect(page.getByText(NAME)).toBeVisible()
    await page.locator(TRASH_ICON).click({ force: true })
  })
})
