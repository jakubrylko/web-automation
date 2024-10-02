import { expect, Page } from '@playwright/test'

export const closeCookieModal = async (page: Page) => {
  await page.waitForTimeout(250)
  await page.getByText('Okay').click()
  await expect(page.locator('.cookie-banner1_component')).not.toBeVisible()
}

export const clickOnMenuTab = async (page: Page, tab: string) => {
  await page.locator(`.navbar5_link:has-text("${tab}")`).click()
}
