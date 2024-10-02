import { expect, test } from '@playwright/test'

test.describe('Alerts', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('Should display and assert alert after 5s', async ({ page }) => {
    await page.getByText('Alerts, Frame & Windows').click()
    await page.getByText('Alerts', { exact: true }).click()

    page.on('dialog', async (alert) => {
      expect(alert.message()).toEqual('This alert appeared after 5 seconds')
      await alert.dismiss()
    })

    await page.getByText('Click me').nth(1).click()
    await page.waitForTimeout(5100)
  })
})
