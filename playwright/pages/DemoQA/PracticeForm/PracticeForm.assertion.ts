import { expect, Page } from '@playwright/test'
import { PracticeFormPage } from './PracticeForm.page'

export class PracticeFormAssertion extends PracticeFormPage {
  constructor(page: Page) {
    super(page)
  }

  async assertSubject(subject: string) {
    await this.assert.shouldBeVisible(
      this.page.getByText(subject, { exact: true })
    )
  }

  async assertSubmissionTitle(title: string) {
    await this.assert.shouldBeVisible(this.page.getByText(title))
  }

  async assertSubmittedData() {
    const cells = await this.valueCell.all()
    for (const cell of cells) {
      const text = await cell.textContent()
      expect(text?.trim()).not.toBe('')
    }
  }
}
