import { Page } from '@playwright/test'

declare module '@playwright/test' {
  interface Page {
    getByDataPath(dataPath: string): Locator
    getByType(dataPath: string): Locator
  }
}
