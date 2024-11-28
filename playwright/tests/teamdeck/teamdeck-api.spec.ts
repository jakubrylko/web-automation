import { test } from '@playwright/test'
import { TeamdeckAPIAssertion } from 'playwright/api/Teamdeck/Teamdeck.assertion.api'

test.describe('Teamdeck API', () => {
  let TeamdeckAPI: TeamdeckAPIAssertion

  test.beforeEach(async ({ request }) => {
    TeamdeckAPI = new TeamdeckAPIAssertion(request)
    const loginData = await TeamdeckAPI.login()
    await TeamdeckAPI.writeCookies(loginData)
  })

  test('Should create new project', async () => {
    const userData = await TeamdeckAPI.getCurrentUser()
    const wallId = await TeamdeckAPI.getWallId(userData)

    const project = await TeamdeckAPI.createProject({ wallId })
    const projectId = (await project.json()).id

    await TeamdeckAPI.assertNewProject(project)
    await TeamdeckAPI.assertNewProjectOnTheList({ projectId, wallId })
  })
})
