import { Page, expect } from '@playwright/test'
import { PracticeFormSelectors } from './PracticeForm.selectors'

export class PracticeFormPage extends PracticeFormSelectors {
  constructor(page: Page) {
    super(page)
  }

  async selectGender(gender: Gender) {
    await this.page.getByText(gender, { exact: true }).check()
    await expect(this.page.getByText(gender, { exact: true })).toBeChecked()
  }

  async selectDateOfBirth(day: string, month: string, year: string) {
    await this.dateOfBirth.click()
    await this.monthSelect.selectOption({ label: month })
    await this.yearSelect.selectOption({ label: year })
    await this.page.getByText(day, { exact: true }).click()
    await expect(this.dateOfBirth).toHaveAttribute(
      'value',
      `${day} ${month} ${year}`
    )
  }

  async selectSubject(subject: string) {
    await this.subjectsInput.fill(subject)
    await this.firstSubject.click()
  }

  async selectHobbies(hobbies: Hobby | Hobby[]) {
    for await (const hobby of hobbies) {
      await this.page.getByText(hobby, { exact: true }).check()
      await expect(this.page.getByText(hobby, { exact: true })).toBeChecked()
    }
  }

  async selectFirstState() {
    await this.stateSelect.click()
    await this.firstState.click()
  }

  async selectFirstCity() {
    await this.citySelect.click()
    await this.firstCity.click()
  }
}
