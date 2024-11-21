import { allCrudDemoItems, notificationsList } from '@common/boilerplate'
import { mockGraphQLRequest } from 'cypress/api/utilities'
import * as Home from 'cypress/screens/Boilerplate/Homepage'
import * as Login from 'cypress/screens/Boilerplate/Login'
import dayjs from 'dayjs'

const { env } = Cypress
const credentials = { email: env('EMAIL'), password: env('PASSWORD') }

describe('Boilerplate mocking', () => {
  it('Should intercept CRUD item list', () => {
    mockGraphQLRequest('crudDemoItemListQuery', allCrudDemoItems)

    Login.open()
    Login.authenticate(credentials)

    Home.clickOnNavigationItem('CRUD')
    cy.wait('@crudDemoItemListQuery').then((res) => {
      const itemsArr = res.response?.body.data.allCrudDemoItems.edges
      expect(itemsArr).to.have.length(3)
    })
  })

  it('Should intercept notification list', () => {
    mockGraphQLRequest('notificationsListQuery', notificationsList)

    Login.open()
    Login.authenticate(credentials)

    Home.notificationBell().click()
    const numOfNotifications = notificationsList.allNotifications.edges.length
    Home.assertNotificationList({ count: numOfNotifications })
    Home.bellWithDot().shouldBeVisible()

    Home.clickAllNotifications().then(() => {
      // Updating notificationsList mock to have all notifications read
      notificationsList.allNotifications.edges.forEach((edge) => {
        ;(edge.node.readAt as null | string) = dayjs().toISOString()
      })
      notificationsList.hasUnreadNotifications = false
    })

    cy.reload()
    Home.notificationBell().click()
    Home.allNotificationsShouldBeRead()
  })
})
