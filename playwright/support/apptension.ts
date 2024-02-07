import { expect, Page } from '@playwright/test'

export const closeCookieModal = async (page: Page) => {
  await page.getByText('Okay').click()
  await expect(page.getByTestId('#hs-eu-cookie-confirmation')).not.toBeVisible()
}

export const clickOnMenuTab = async (page: Page, tab: string) => {
  await page.locator(`.menu-link:has-text("${tab}")`).click()
}
