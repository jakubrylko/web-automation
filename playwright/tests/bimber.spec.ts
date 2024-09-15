import { test, expect } from '@playwright/test'
import { faker } from '@faker-js/faker'
import { STRIPE_IFRAME } from '@common/selectors/iframe'

const { firstName, lastName, fullName } = faker.person
const { streetAddress, zipCode, city } = faker.location
const { email } = faker.internet

const cardNumber = '4242424242424242'
const cardExpiry = '1030'
const cardCvc = '123'

test.describe.configure({ mode: 'parallel' })
const numOfExecutions = 1

test.describe('Bimber Distillery', () => {
  for (let i = 0; i < numOfExecutions; i++) {
    test(`${i} Should make a submission for a product`, async ({ page }) => {
      await page.goto(process.env.BALLOT_URL!)

      await page.locator('[data-path="firstname"]').fill(firstName())
      await page.locator('[data-path="lastname"]').fill(lastName())
      await page.locator('[data-path="email"]').fill(email())

      await page
        .locator('[data-path="billingAddressLine1"]')
        .fill(streetAddress())
      await page.locator('[data-path="billingAddressZipCode"]').fill(zipCode())
      await page.locator('[data-path="billingAddressCity"]').fill(city())
      await page.locator('[data-path="billingAddressCountry"]').fill('Poland')
      await page.locator('[data-path="shippingSameAsBilling"]').click()

      const numOfProducts = await page.locator('[type="radio"]').count()
      const randomProduct = Math.floor(Math.random() * numOfProducts)
      await page.locator('[type="radio"]').nth(randomProduct).click()
      await page.locator('[type="submit"]').click()

      await page
        .frameLocator(STRIPE_IFRAME)
        .locator('#cardNumber')
        .fill(cardNumber)
      await page
        .frameLocator(STRIPE_IFRAME)
        .locator('#cardExpiry')
        .fill(cardExpiry)
      await page.frameLocator(STRIPE_IFRAME).locator('#cardCvc').fill(cardCvc)
      await page
        .frameLocator(STRIPE_IFRAME)
        .locator('#billingName')
        .fill(fullName())
      await page
        .frameLocator(STRIPE_IFRAME)
        .getByTestId('hosted-payment-submit-button')
        .click()

      await expect(
        page.frameLocator(STRIPE_IFRAME).getByText('Thanks for your payment')
      ).toBeVisible()
    })
  }
})
