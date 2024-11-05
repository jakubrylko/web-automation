import { APIRequestContext, APIResponse, expect, Page } from '@playwright/test'

export class Utilities {
  private page?: Page
  private request: APIRequestContext

  constructor(request: APIRequestContext, page?: Page) {
    this.page = page
    this.request = request
  }

  statusShouldBeOk(response: APIResponse) {
    expect(response.ok()).toBe(true)
  }

  async sendGet(url: string) {
    return await this.request.get(url)
  }

  async sendPost(url: string, data?: object) {
    return await this.request.post(url, { data })
  }

  async sendGraphQLRequest(
    url: string,
    operationName: string,
    query: string,
    { variables = {} }: { variables?: object } = {}
  ) {
    return await this.request.post(url, {
      data: { operationName, query, variables }
    })
  }

  async mock(url: string, mock: object) {
    await this.page?.route(url, async (route) => {
      await route.fulfill({ json: mock })
    })
  }
}
