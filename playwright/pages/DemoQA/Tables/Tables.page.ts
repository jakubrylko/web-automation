import { Page } from '@playwright/test'
import { TablesSelectors } from './Tables.selectors'

export class TablesPage extends TablesSelectors {
  constructor(page: Page) {
    super(page)
  }

  async countRows() {
    return await this.deleteButton.count()
  }
}
