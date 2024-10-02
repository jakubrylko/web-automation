import { LINK } from '@common/selectors/links'
import { expect, test } from '@playwright/test'

test.describe('Links', () => {
  test('Should count and assert all links', async ({ page }) => {
    await page.goto('/')
    await page.getByText('Elements').click()
    await page.getByText('Links', { exact: true }).click()

    const linkLocator = page.locator(LINK)
    const numOfLinks = await linkLocator.count()

    for (let i = 0; i < numOfLinks; i++) {
      await expect(linkLocator.nth(i)).toBeVisible()
      await expect(linkLocator.nth(i)).toHaveAttribute('href')
    }
  })
})
