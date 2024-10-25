import { APIRequestContext, APIResponse, expect } from '@playwright/test'

export class Utilities {
  constructor(private request: APIRequestContext) {
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
}
