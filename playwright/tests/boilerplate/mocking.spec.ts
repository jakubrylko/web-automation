import { allCrudDemoItems, notificationsList } from '@common/boilerplate'
import { test } from '@playwright/test'
import dayjs from 'dayjs'
import { BoilerplateAPIAssertion } from 'playwright/api/Boilerplate/Boilerplate.assertion.api'
import { HeaderAssertion } from 'playwright/components/Boilerplate/Header/Header.assertion'
import { CrudAssertion } from 'playwright/pages/Boilerplate/Crud/Crud.assertion'
import { HomeAssertion } from 'playwright/pages/Boilerplate/Homepage/Home.assertion'
import { LoginPage } from 'playwright/pages/Boilerplate/Login/Login.page'

const { EMAIL, PASSWORD } = process.env
const credentials = { email: EMAIL!, password: PASSWORD! }

test.describe('Boilerplate mocking', () => {
  let BoilerplateAPI: BoilerplateAPIAssertion
  let Login: LoginPage
  let Home: HomeAssertion

  test.beforeEach(async ({ request, page }) => {
    BoilerplateAPI = new BoilerplateAPIAssertion(request, page)
    Login = new LoginPage(page)
    Home = new HomeAssertion(page)
  })

  test('Should intercept CRUD items list', async ({ page }) => {
    const Header = new HeaderAssertion(page)
    const Crud = new CrudAssertion(page)
    await BoilerplateAPI.utils.mockGraphQLRequest(
      'crudDemoItemListQuery',
      allCrudDemoItems
    )

    await Login.open()
    await Login.signIn(credentials)

    await Home.clickOnNavigationItem('CRUD')
    await Header.assertHeaderTitle('CRUD Example Items')
    await Crud.assertItemsCount(5)
  })

  test('Should intercept notifications list', async ({ page }) => {
    await BoilerplateAPI.utils.mockGraphQLRequest(
      'notificationsListQuery',
      notificationsList
    )

    await Login.open()
    await Login.signIn(credentials)
    await Home.notificationBell.click()
    await Home.assertNotificationList({ count: 3 })
    await Home.assert.shouldBeVisible(Home.bellWithDot)
    await Home.clickAllNotifications()

    // Updating notificationsList mock to have all notifications read
    notificationsList.allNotifications.edges.forEach((edge) => {
      ;(edge.node.readAt as null | string) = dayjs().toISOString()
    })
    notificationsList.hasUnreadNotifications = false

    page.reload()
    await Home.notificationBell.click()
    await Home.assertAllNotificationsAreRead()
  })
})
