import { Page, expect } from '@playwright/test'
import { PracticeFormSelectors } from './PracticeForm.selectors'
import { faker } from '@faker-js/faker'

const { int } = faker.number

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
    await this.page.locator(`[aria-label*="${month} ${day}"]`).nth(0).click()

    await expect(this.dateOfBirth).toHaveAttribute(
      'value',
      `${day.padStart(2, '0')} ${month.slice(0, 3)} ${year}`
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

  async selectRandomState() {
    await this.stateSelect.click()
    const numOfStates = await this.stateOption.count()
    const randomState = int({ min: 1, max: numOfStates - 1 })
    await this.stateOption.nth(randomState).click()
  }

  async selectRandomCity() {
    await this.citySelect.click()
    const numOfCities = await this.cityOption.count()
    const randomState = int({ min: 1, max: numOfCities - 1 })
    await this.cityOption.nth(randomState).click()
  }
}
