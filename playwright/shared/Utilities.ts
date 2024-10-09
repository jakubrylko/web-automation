import { Locator, Page, expect } from '@playwright/test'

export class Utilities {
  constructor(private page: Page) {
    this.page = page
  }

  getByDataPath(dataPath: string): Locator {
    return this.page.locator(`[data-path="${dataPath}"]`)
  }

  getByType(type: string): Locator {
    return this.page.locator(`[type="${type}"]`)
  }

  async compareScreenshots(screenshot: string) {
    await expect(this.page).toHaveScreenshot(screenshot)
  }
}
