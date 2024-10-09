import { Page } from '@playwright/test'
import { LinksSelectors } from './Links.selectors'

export class LinksAssertion extends LinksSelectors {
  constructor(page: Page) {
    super(page)
  }

  async assertLinks() {
    const numOfLinks = await this.link.count()
    for (let i = 0; i < numOfLinks; i++) {
      await this.assert.shouldBeVisible(this.link, { index: i })
      await this.assert.shouldHaveAttribute(this.link, {
        index: i,
        attr: 'href'
      })
    }
  }
}
