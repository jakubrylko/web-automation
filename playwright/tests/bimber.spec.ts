import { expect } from '@playwright/test'
import { test } from 'playwright/support/my-test'
import { faker } from '@faker-js/faker'
import { STRIPE_IFRAME } from '@common/selectors/iframe'

const { person, location, internet } = faker

const cardNumber = '4242424242424242'
const cardExpiry = '1030'
const cardCvc = '123'

test.describe.configure({ mode: 'parallel' })
const numOfExecutions = 1

test.describe('Bimber Distillery', () => {
  for (let i = 0; i < numOfExecutions; i++) {
    test(`${i} Should make a submission for a product`, async ({ page }) => {
      await page.goto(process.env.BALLOT_URL!)

      await page.getByDataPath('firstname').fill(person.firstName())
      await page.getByDataPath('lastname').fill(person.lastName())
      await page.getByDataPath('email').fill(internet.email())

      await page
        .getByDataPath('billingAddressLine1')
        .fill(location.streetAddress())
      await page.getByDataPath('billingAddressZipCode').fill(location.zipCode())
      await page.getByDataPath('billingAddressCity').fill(location.city())
      await page.getByDataPath('billingAddressCountry').fill('Poland')
      await page.getByDataPath('shippingSameAsBilling').click()

      const numOfProducts = await page.getByType('radio').count()
      const randomProduct = Math.floor(Math.random() * numOfProducts)
      await page.getByType('radio').nth(randomProduct).click()
      await page.getByType('submit').click()

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
        .fill(person.fullName())
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
