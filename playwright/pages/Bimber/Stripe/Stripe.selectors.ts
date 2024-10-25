import { FrameLocator, Locator, Page } from '@playwright/test'
import { BaseClass } from 'playwright/shared/BaseClass'

export class StripeSelectors extends BaseClass {
  readonly iframe: FrameLocator
  readonly cardCvc: Locator
  readonly cardExpiry: Locator
  readonly cardNumber: Locator
  readonly cardOwner: Locator
  readonly submitButton: Locator

  constructor(page: Page) {
    super(page)

    this.iframe = page.frameLocator('iframe[name="embedded-checkout"]')
    this.cardCvc = this.iframe.locator('#cardCvc')
    this.cardExpiry = this.iframe.locator('#cardExpiry')
    this.cardNumber = this.iframe.locator('#cardNumber')
    this.cardOwner = this.iframe.locator('#billingName')
    this.submitButton = this.iframe.getByTestId('hosted-payment-submit-button')
  }
}
