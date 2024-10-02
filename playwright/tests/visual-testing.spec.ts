import { expect, test } from '@playwright/test'

test.describe('Visual testing', () => {
  test('Should compare random pictures', async ({ page }) => {
    await page.goto('https://randomwordgenerator.com/picture.php')
    await page.getByLabel('I understand', { exact: true }).click()
    await expect(page).toHaveScreenshot('random.png')
  })

  test('Should compare homepage of DemoQA', async ({ page }) => {
    await page.goto('/')
    await page.getByLabel('Consent', { exact: true }).click()
    await expect(page).toHaveScreenshot('homepage.png')
  })
})
