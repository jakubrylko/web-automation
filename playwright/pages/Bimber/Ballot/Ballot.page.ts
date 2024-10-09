import { Page } from '@playwright/test'
import { BallotSelectors } from './Ballot.selectors'

export class BallotPage extends BallotSelectors {
  constructor(page: Page) {
    super(page)
  }

  async selectRandomProduct() {
    const numOfProducts = await this.radioButton.count()
    const randomProduct = Math.floor(Math.random() * numOfProducts)
    await this.radioButton.nth(randomProduct).click()
  }
}
