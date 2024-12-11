import { test } from '@playwright/test'
import { BoilerplateAPIAssertion } from 'playwright/api/Boilerplate/Boilerplate.assertion.api'
import { HomeAssertion } from 'playwright/pages/Boilerplate/Homepage/Home.assertion'
import { LoginPage } from 'playwright/pages/Boilerplate/Login/Login.page'

test.describe('Boilerplate login', () => {
  test('Should login to the app with cookies', async ({ browser, request }) => {
    const BoilerplateAPI = new BoilerplateAPIAssertion(request)
    const loginData = await BoilerplateAPI.login()
    const cookies = await BoilerplateAPI.getCookies(loginData)

    const context = await browser.newContext()
    await context.addCookies(cookies)
    const page = await context.newPage()
    const Login = new LoginPage(page)
    const Home = new HomeAssertion(page)

    await Login.open()
    await Home.assertWelcomeMessage()
  })
})
