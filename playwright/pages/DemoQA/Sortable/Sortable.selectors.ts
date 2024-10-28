import { Locator, Page } from '@playwright/test'
import { BaseClass } from 'playwright/shared/BaseClass'

export class SortableSelectors extends BaseClass {
  readonly gridItem: Locator
  readonly gridTab: Locator
  readonly listTab: Locator

  constructor(page: Page) {
    super(page)

    this.gridItem = page.locator('#demo-tabpane-grid .list-group-item')
    this.gridTab = page.locator('#demo-tab-grid')
    this.listTab = page.locator('#demo-tab-list')
  }
}
