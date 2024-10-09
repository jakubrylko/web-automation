import { expect, Locator } from '@playwright/test'

type Elements = Locator | Locator[]

export class Assertions {
  async shouldBeVisible(elements: Elements, { index = 0 } = {}) {
    if (Array.isArray(elements)) {
      for (const element of elements) {
        await expect(element).toBeVisible()
      }
    } else {
      await expect(elements.nth(index)).toBeVisible()
    }
  }

  async shouldBeHidden(elements: Elements, { index = 0 } = {}) {
    if (Array.isArray(elements)) {
      for (const element of elements) {
        await expect(element).toBeHidden()
      }
    } else {
      await expect(elements.nth(index)).toBeHidden()
    }
  }

  async shouldHaveAttribute(
    elements: Elements,
    { attr, index = 0 }: { attr: string; index?: number }
  ) {
    if (Array.isArray(elements)) {
      for (const element of elements) {
        await expect(element).toHaveAttribute(attr)
      }
    } else {
      await expect(elements.nth(index)).toHaveAttribute(attr)
    }
  }
}
