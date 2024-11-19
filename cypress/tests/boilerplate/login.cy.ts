import * as BoilerplateAPI from 'cypress/api/Boilerplate'
import { statusShouldBeOk } from 'cypress/api/utilities'
import * as Home from 'cypress/screens/Boilerplate/Homepage'

describe('Boilerplate login', () => {
  it('Should login to the app with cookies', () => {
    BoilerplateAPI.login().then((response) => {
      statusShouldBeOk(response)

      const { tokenAuth } = response.body.data
      cy.setCookie('token', tokenAuth.access)
      cy.setCookie('refresh_token', tokenAuth.refresh)
    })

    Home.open()
    Home.assertWelcomeMessage()
  })
})
