import { cardDetails } from '@common/test-data'
import { test } from '@playwright/test'
import { HomeAssertion } from 'playwright/pages/Boilerplate/Homepage/Home.assertion'
import { LoginPage } from 'playwright/pages/Boilerplate/Login/Login.page'
import { PaymentsAssertion } from 'playwright/pages/Boilerplate/Payments/Payments.assertion'

const { EMAIL, PASSWORD } = process.env
const { cardOwner, cardNumber, cardExpiry, cardCvc } = cardDetails

test.describe('Boilerplate iframe', () => {
  test('Should fill card details in iframe', async ({ page }) => {
    const Login = new LoginPage(page)
    const Home = new HomeAssertion(page)
    const Payments = new PaymentsAssertion(page)

    await Login.open()
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
    await Payments.removeAddedCard({ cardOwner })
  })
})
