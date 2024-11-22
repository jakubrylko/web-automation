import { expect, Page } from '@playwright/test'
import { CrudSelectors } from './Crud.selectors'

export class CrudAssertion extends CrudSelectors {
  constructor(page: Page) {
    super(page)
  }

  async assertItemsCount(count: number) {
    await expect(this.item).toHaveCount(count)
  }
}
