import { expect, Page } from '@playwright/test'
import dayjs from 'dayjs'
import { HomePage } from './Home.page'

export class HomeAssertion extends HomePage {
  constructor(page: Page) {
    super(page)
  }

  async assertInputDate({ offsetDays = -3 } = {}) {
    const inputDate = await this.datepicker.inputValue()
    const expectedDate = dayjs().add(offsetDays, 'day').format('DD.MM.YYYY')
    expect(inputDate).toEqual(expectedDate)
  }
}
