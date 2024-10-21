import { test } from '@playwright/test'
import { LoginSelectors } from 'playwright/pages/Boilerplate/Login/Login.selectors'
import { PaymentsAssertion } from 'playwright/pages/Boilerplate/Payments/Payments.assertion'
import { HomeAssertion } from 'playwright/pages/Boilerplate/Homepage/Home.assertion'
import { cardDetails } from 'common/test-data'

const { SAAS_URL, SAAS_USERNAME, SAAS_PASSWORD, EMAIL, PASSWORD } = process.env

const BASIC_AUTH = {
  httpCredentials: {
    username: SAAS_USERNAME!,
    password: SAAS_PASSWORD!
  }
}

const { cardOwner, cardNumber, cardExpiry, cardCvc } = cardDetails

test.describe('Saas Boilerplate', () => {
  test('Should fill card details in iframe', async ({ browser }) => {
    const context = await browser.newContext(BASIC_AUTH)
    const page = await context.newPage()

    const Login = new LoginSelectors(page)
    const Home = new HomeAssertion(page)
    const Payments = new PaymentsAssertion(page)

    await page.goto(SAAS_URL!)
    await Login.email.fill(EMAIL!)
    await Login.password.fill(PASSWORD!)
    await Login.loginButton.click()

    await Home.clickOnNavigationItem('Payments')

    await Payments.selectPaymentAmount('5')
    await Payments.cardOwner.fill(cardOwner)
    await Payments.cardNumber.fill(cardNumber)
    await Payments.cardExpiry.fill(cardExpiry)
    await Payments.cardCvc.fill(cardCvc)
    await Payments.submitButton.click()

    await Home.assertToastMessage()
    await Home.clickOnMenuTile('Payments')

    await Payments.assertAddedCard({ cardOwner })
    await Payments.removeSavedCard({ cardOwner })
  })
})
