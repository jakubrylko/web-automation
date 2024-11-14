import { Page, expect } from '@playwright/test'
import { WindowsPage } from './Windows.page'

export class WindowsAssertion extends WindowsPage {
  constructor(page: Page) {
    super(page)
  }

  async assertNewWindowHeader(newWindow: Page, { text }: { text: string }) {
    await expect(newWindow.locator('h1')).toHaveText(text)
  }

  async assertNewWindowBody(newWindow: Page, { text }: { text: string }) {
    await expect(newWindow.locator('body')).toContainText(text)
  }

  async assertBrowserWindowsHeader() {
    await this.assert.shouldBeVisible(this.browserWindowsHeader)
  }

  async assertNumOfPages(count: number) {
    const pages = this.page.context().pages()
    expect(pages.length).toEqual(count)
  }
}
