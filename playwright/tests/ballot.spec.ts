import { cardDetails } from '@common/test-data'
import { faker } from '@faker-js/faker'
import { BallotPage } from 'playwright/pages/Bimber/Ballot/Ballot.page'
import { StripeAssertion } from 'playwright/pages/Bimber/Stripe/Stripe.assertion'
import { test } from 'playwright/support'

const { person, location, internet } = faker
const { cardOwner, cardNumber, cardExpiry, cardCvc } = cardDetails

test.describe.configure({ mode: 'parallel' })
const numOfExecutions = 1

test.describe('Bimber Distillery', () => {
  for (let i = 0; i < numOfExecutions; i++) {
    test(`[${i + 1}] Should make a submission for a product`, async ({
      page
    }) => {
      const Ballot = new BallotPage(page)
      const Stripe = new StripeAssertion(page)

      await page.goto(process.env.BALLOT_URL!)

      await Ballot.firstName.fill(person.firstName())
      await Ballot.lastName.fill(person.lastName())
      await Ballot.email.fill(internet.email())

      await Ballot.billingAddress.fill(location.streetAddress())
      await Ballot.billingZipCode.fill(location.zipCode())
      await Ballot.billingCity.fill(location.city())
      await Ballot.billingCountry.fill('Poland')
      await Ballot.sameAddressCheckbox.click()

      await Ballot.selectRandomProduct()
      await Ballot.submitButton.click()

      await Stripe.cardNumber.fill(cardNumber)
      await Stripe.cardExpiry.fill(cardExpiry)
      await Stripe.cardCvc.fill(cardCvc)
      await Stripe.cardOwner.fill(cardOwner)
      await Stripe.submitButton.click()
      await Stripe.assertConfirmMessage('Thanks for your payment')
    })
  }
})
