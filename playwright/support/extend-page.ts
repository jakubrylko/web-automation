import { Page, Locator } from '@playwright/test'

export const extendPage = (page: Page) => {
  page.getByDataPath = (dataPath: string): Locator => {
    return page.locator(`[data-path="${dataPath}"]`)
  }

  page.getByType = (type: string): Locator => {
    return page.locator(`[type="${type}"]`)
  }
}
