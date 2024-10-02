import { test as base } from '@playwright/test'
import { aiFixture, type AiFixture } from '@zerostep/playwright'
import { extendPage } from './extend-page'

export const test = base.extend<AiFixture>({
  ...aiFixture(base)
})

test.beforeEach(async ({ page }) => {
  extendPage(page)
})
