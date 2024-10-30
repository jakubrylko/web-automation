import { Page } from '@playwright/test'
import { HomeSelectors } from './Home.selectors'
import dayjs from 'dayjs'

export class HomePage extends HomeSelectors {
  constructor(page: Page) {
    super(page)
  }

  async selectDateByTimestamp({ offsetDays = 0 } = {}) {
    const date = dayjs()
      .add(offsetDays, 'day')
      .hour(0)
      .minute(0)
      .second(0)
      .millisecond(0)
    const timestamp = date.valueOf()

    await this.page
      .locator(`.md-calendar-date[data-timestamp="${timestamp}"]`)
      .click()
  }

  async selectDateByAriaLabel({ offsetDays = 0 } = {}) {
    const date = dayjs().add(offsetDays, 'day').format('dddd MMMM D YYYY')
    await this.page.locator(`[aria-label="${date}"]`).click()
  }
}
