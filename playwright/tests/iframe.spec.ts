import { test, expect } from '@playwright/test'
import { fillStripeField } from 'playwright/support/iframe'
import {
  EMAIL_INPUT,
  PASSWORD_INPUT,
  SUBMIT_BTN,
  NAME_INPUT,
  TOAST_MSG,
  TRASH_ICON,
} from '@common/selectors/iframe'

import 'dotenv/config'

const BASIC_AUTH = `${process.env.BASIC_AUTH_USERNAME}:${process.env.BASIC_AUTH_PASSWORD}`
const EMAIL = process.env.EMAIL
const PASSWORD = process.env.PASSWORD

test.describe('iFrame task', () => {
  const NAME = 'JR Test'
  const CARD_NUMBER = '4242424242424242'
  const YEAR = '1030'
  const CVC = '123'

  test('Should fill card details in iframe', async ({ page }) => {
    await page.goto(`https://${BASIC_AUTH}@app.qa.saas.apptoku.com`)
    await page.goto('https://app.qa.saas.apptoku.com')

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
