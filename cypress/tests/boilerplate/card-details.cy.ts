import { cardDetails } from '@common/test-data'
import * as BoilerplateAPI from 'cypress/api/Boilerplate'
import { statusShouldBeOk } from 'cypress/api/utilities'
import * as Home from 'cypress/screens/Boilerplate/Homepage'
import * as Payments from 'cypress/screens/Boilerplate/Payments'

const { env } = Cypress
const { cardOwner } = cardDetails

describe('Boilerplate iframe', () => {
  it('Should fill card details in iframe', () => {
    BoilerplateAPI.login().then((response) => statusShouldBeOk(response))
    cy.visit(env('SAAS_URL'))

    Home.clickOnNavigationItem('Payments')

    Payments.selectPaymentAmount('5')
    Payments.fillCardDetails(cardDetails)
    Payments.submitButton().click()

    Home.assertToastMessage()
    Home.clickOnMenuTile('Payments')

    Payments.assertAddedCard({ cardOwner })
    Payments.removeAddedCard()
  })
})
