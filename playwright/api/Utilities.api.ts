import { APIRequestContext } from '@playwright/test'

export class Utilities {
  constructor(private request: APIRequestContext) {
    this.request = request
  }

  async getRequest(url: string) {
    return await this.request.get(url)
  }

  async postRequest(url: string, data?: object) {
    return await this.request.post(url, { data })
  }
}
