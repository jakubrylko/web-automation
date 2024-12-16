import { expect, test } from '@playwright/test'
import { TeamdeckAPIAssertion } from 'playwright/api/Teamdeck/Teamdeck.assertion.api'

test.describe('Teamdeck API', () => {
  let TeamdeckAPI: TeamdeckAPIAssertion
  let wallId: string

  test.beforeEach(async ({ request }) => {
    TeamdeckAPI = new TeamdeckAPIAssertion(request)
    const loginData = await TeamdeckAPI.login()
    await TeamdeckAPI.writeCookies(loginData)

    const currentUser = await TeamdeckAPI.getCurrentUser()
    wallId = await TeamdeckAPI.getWallId(currentUser)
  })

  test.afterAll(async ({ request }) => {
    TeamdeckAPI = new TeamdeckAPIAssertion(request)
    await TeamdeckAPI.deleteAllProjects({ wallId })
    await TeamdeckAPI.deleteAllResources({ wallId })
  })

  test('Should get a single project', async () => {
    const newProject = await TeamdeckAPI.createProject({ wallId })
    const projectId = (await newProject.json()).id

    const project = await TeamdeckAPI.getProject({ wallId, projectId })
    TeamdeckAPI.utils.statusShouldBeOk(project)
    await TeamdeckAPI.assertProject(project)
  })

  test('Should get list of projects', async () => {
    await TeamdeckAPI.createProject({ wallId })
    const projects = await TeamdeckAPI.getProjects({ wallId })
    TeamdeckAPI.utils.statusShouldBeOk(projects)
    await TeamdeckAPI.assertProjectList(projects)
  })

  test('Should create new project', async () => {
    const project = await TeamdeckAPI.createProject({ wallId })
    const projectId = (await project.json()).id
    await TeamdeckAPI.assertProjectOnTheList({ projectId, wallId })
  })

  test('Should update existing project', async () => {
    const projectData = await TeamdeckAPI.createProject({ wallId })
    const project = await projectData.json()

    const updatedProjectData = await TeamdeckAPI.updateProject({
      wallId,
      projectId: project.id
    })
    const updatedProject = await updatedProjectData.json()

    expect(project.id).toEqual(updatedProject.id)
    expect(project.name).not.toEqual(updatedProject.name)
  })

  test('Should create new project, resource, booking and time entry', async () => {
    const project = await TeamdeckAPI.createProject({ wallId })
    TeamdeckAPI.utils.statusShouldBeOk(project)

    const units = await TeamdeckAPI.getOrganizationUnits({ wallId })
    const unitId = await TeamdeckAPI.getMainUnitId(units)
    const resource = await TeamdeckAPI.createResource({ unitId, wallId })
    TeamdeckAPI.utils.statusShouldBeOk(resource)

    const projectId = (await project.json()).id
    const resourceId = (await resource.json()).id
    const booking = await TeamdeckAPI.createBooking({
      wallId,
      projectId,
      resourceId
    })
    TeamdeckAPI.utils.statusShouldBeOk(booking)

    const timeEntry = await TeamdeckAPI.createTimeEntry({
      wallId,
      projectId,
      resourceId
    })
    TeamdeckAPI.utils.statusShouldBeOk(timeEntry)
    const timeEntryId = (await timeEntry.json())[0].id
    await TeamdeckAPI.assertTimeEntryOnTheList({ wallId, timeEntryId })
  })
})
