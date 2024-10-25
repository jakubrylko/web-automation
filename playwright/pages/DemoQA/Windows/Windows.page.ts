import { Locator, Page } from '@playwright/test'
import { WindowsSelectors } from './Windows.selectors'

export class WindowsPage extends WindowsSelectors {
  constructor(page: Page) {
    super(page)
  }

  async openNewWindow(selector: Locator) {
    const [newWindow] = await Promise.all([
      this.page.context().waitForEvent('page'),
      selector.click()
    ])
    return newWindow
  }
}
