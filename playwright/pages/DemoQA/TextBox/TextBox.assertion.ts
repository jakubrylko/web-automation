import { Page, expect } from '@playwright/test'
import { TextBoxSelectors } from './TextBox.selectors'

export class TextBoxAssertion extends TextBoxSelectors {
  constructor(page: Page) {
    super(page)
  }

  async assertOutputData({ count }: { count: 4 }) {
    const numOfElements = await this.outputData.count()
    expect(numOfElements).toEqual(count)

    for (let i = 0; i < numOfElements; i++) {
      const elementText = await this.outputData.nth(i).textContent()
      expect(elementText?.trim()).toBeTruthy()
    }
  }
}
