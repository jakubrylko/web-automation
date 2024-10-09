import { APIResponse, expect } from '@playwright/test'

export class Assertions {
  statusShouldBeOk(response: APIResponse) {
    expect(response.ok()).toBe(true)
  }
}
