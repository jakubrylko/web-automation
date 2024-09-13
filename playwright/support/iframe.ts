import { Page } from '@playwright/test'

export const fillStripeField = async (
  page: Page,
  number: number,
  data: string
) => {
  await page
    .frameLocator('iframe[title*="input frame"]')
    .nth(number)
    .locator('.InputElement')
    .fill(data)
}
