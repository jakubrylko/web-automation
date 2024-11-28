import {
  APIRequestContext,
  APIResponse,
  expect,
  Page,
  Response
} from '@playwright/test'
import { TeamdeckAPIHelpers } from './Teamdeck.helpers.api'

export class TeamdeckAPIAssertion extends TeamdeckAPIHelpers {
  constructor(request: APIRequestContext, page?: Page) {
    super(request, page)
  }

  async assertItemList(response: Response, { isEmpty = false } = {}) {
    const body = await response.json()
    isEmpty
      ? expect(body.items).toEqual([])
      : expect(body.items).not.toEqual([])
  }

  async assertNewProject(response: APIResponse) {
    const expectedProperties = [
      ['id', 'number'],
      ['name', 'string'],
      ['color', 'string'],
      ['archived', 'boolean']
    ]

    const body = await response.json()
    for (const [property, type] of expectedProperties) {
      expect(body).toHaveProperty(property)
      expect(typeof body[property]).toBe(type)
    }
  }

  async assertNewProjectOnTheList({
    projectId,
    wallId
  }: { projectId: string } & WallId) {
    const projects = await this.getProjects({ wallId })
    const projectsJSON = await projects.json()

    expect(projectsJSON).toEqual(
      expect.arrayContaining([expect.objectContaining({ id: projectId })])
    )
  }
}
