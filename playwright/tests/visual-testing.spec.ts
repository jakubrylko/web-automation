import { test } from '@playwright/test'
import { Utilities } from 'playwright/shared/Utilities'

test.describe('Visual testing', () => {
  let Utils: Utilities

  test.beforeAll(async ({ page }) => {
    Utils = new Utilities(page)
  })

  test('Should compare random pictures', async ({ page }) => {
    await page.goto('https://randomwordgenerator.com/picture.php')
    await page.getByLabel('I understand').click()
    await Utils.compareScreenshots('random.png')
  })

  test('Should compare DemoQA homepage', async ({ page }) => {
    await page.goto('/')
    await Utils.compareScreenshots('homepage.png')
  })
})
