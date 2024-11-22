import { expect, Locator } from '@playwright/test'

type Elements = Locator | Locator[]

export class Assertions {
  async shouldBeVisible(elements: Elements) {
    if (Array.isArray(elements)) {
      for (const element of elements) {
        await expect(element).toBeVisible()
      }
    } else {
      await expect(elements).toBeVisible()
    }
  }

  async shouldBeHidden(elements: Elements) {
    if (Array.isArray(elements)) {
      for (const element of elements) {
        await expect(element).toBeHidden()
      }
    } else {
      await expect(elements).toBeHidden()
    }
  }

  async shouldHaveAttribute(
    elements: Elements,
    { attr, value }: { attr: string; value?: string }
  ) {
    const assertAttribute = async (element: Locator) =>
      value
        ? expect(element).toHaveAttribute(attr, value)
        : expect(element).toHaveAttribute(attr)

    if (Array.isArray(elements)) {
      await Promise.all(elements.map(assertAttribute))
    } else {
      await assertAttribute(elements)
    }
  }
}
