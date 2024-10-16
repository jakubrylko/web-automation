import { FrameLocator, Locator, Page } from '@playwright/test'
import { BaseClass } from 'playwright/shared/BaseClass'

export class PaymentsSelectors extends BaseClass {
  readonly iframe: FrameLocator
  readonly cardCvc: Locator
  readonly cardExpiry: Locator
  readonly cardNumber: Locator
  readonly cardOwner: Locator
  readonly submitButton: Locator
  readonly trashIcon: Locator

  constructor(page: Page) {
    super(page)

    this.iframe = page.frameLocator('iframe[title*="input frame"]')
    this.cardCvc = this.iframe.nth(2).locator('[name="cvc"]')
    this.cardExpiry = this.iframe.nth(1).locator('[name="exp-date"]')
    this.cardNumber = this.iframe.nth(0).locator('[name="cardnumber"]')
    this.cardOwner = page.locator('input[name*="name"]')
    this.submitButton = this.selectors.submitButton
    this.trashIcon = page.locator('svg[class*="trash"]')
  }
}
