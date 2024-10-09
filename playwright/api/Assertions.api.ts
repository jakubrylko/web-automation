import { APIResponse, expect } from '@playwright/test'

export class Assertions {
  async statusShouldBeOk(response: APIResponse) {
    expect(response.ok()).toBe(true)
  }
}
