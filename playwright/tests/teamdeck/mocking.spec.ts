import { emptyItemList, mockedResourceList } from '@common/teamdeck'
import {
  APIRequestContext,
  BrowserContext,
  expect,
  Page,
  test
} from '@playwright/test'
import { TeamdeckAPIAssertion } from 'playwright/api/Teamdeck/Teamdeck.assertion.api'
import { HomeSelectors } from 'playwright/pages/Teamdeck/Homepage/Home.selectors'
import {
  BASIC_AUTH,
  LoginPage
} from 'playwright/pages/Teamdeck/Login/Login.page'

const { EMAIL, PASSWORD } = process.env
const credentials = { email: EMAIL!, password: PASSWORD! }

const resourceListUrl = '**/calendar?dataTypes=1,2,3,4**page=1**'
const projectListUrl = '**/calendar?dataTypes=7,1,2,4**page=1**'

test.describe('Mocking', () => {
  let context: BrowserContext
  let page: Page
  let request: APIRequestContext

  let Login: LoginPage
  let Home: HomeSelectors
  let TeamdeckAPI: TeamdeckAPIAssertion

  test.beforeAll(async ({ browser }) => {
    context = await browser.newContext(BASIC_AUTH)
    page = await context.newPage()
    Login = new LoginPage(page)
    Home = new HomeSelectors(page)
    TeamdeckAPI = new TeamdeckAPIAssertion(request, page)
  })

  test.beforeEach(async () => {
    await context.clearCookies()
  })

  test('Should intercept request and assert that list is populated', async () => {
    await Login.open()
    await Login.signIn(credentials)

    const resourceList = await page.waitForResponse(resourceListUrl)
    await TeamdeckAPI.assertItemList(resourceList)

    await Home.projectsButton.click()
    const projectList = await page.waitForResponse(projectListUrl)
    await TeamdeckAPI.assertItemList(projectList)
  })

  test('Should intercept request and return empty list', async () => {
    await TeamdeckAPI.utils.mock(resourceListUrl, emptyItemList)
    await TeamdeckAPI.utils.mock(projectListUrl, emptyItemList)

    await Login.open()
    await Login.signIn(credentials)

    const resourceList = await page.waitForResponse(resourceListUrl)
    await TeamdeckAPI.assertItemList(resourceList, { isEmpty: true })

    await Home.projectsButton.click()
    const projectList = await page.waitForResponse(projectListUrl)
    await TeamdeckAPI.assertItemList(projectList, { isEmpty: true })
  })

  test('Should intercept request and return static list', async () => {
    await TeamdeckAPI.utils.mock(resourceListUrl, mockedResourceList)

    await Login.open()
    await Login.signIn(credentials)

    const resourceList = await page.waitForResponse(resourceListUrl)
    await TeamdeckAPI.assertItemList(resourceList)

    const numOfResources = (await resourceList.json()).items.length
    expect(numOfResources).toEqual(mockedResourceList.items.length)
  })
})
