import { Locator, Page } from '@playwright/test'
import { BaseClass } from '../../../shared/BaseClass'

export class BallotSelectors extends BaseClass {
  readonly billingAddress: Locator
  readonly billingCity: Locator
  readonly billingCountry: Locator
  readonly billingZipCode: Locator
  readonly email: Locator
  readonly firstName: Locator
  readonly lastName: Locator
  readonly radioButton: Locator
  readonly sameAddressCheckbox: Locator
  readonly submitButton: Locator

  constructor(page: Page) {
    super(page)

    this.billingAddress = this.utils.getByDataPath('billingAddressLine1')
    this.billingCity = this.utils.getByDataPath('billingAddressCity')
    this.billingCountry = this.utils.getByDataPath('billingAddressCountry')
    this.billingZipCode = this.utils.getByDataPath('billingAddressZipCode')
    this.email = this.utils.getByDataPath('email')
    this.firstName = this.utils.getByDataPath('firstname')
    this.lastName = this.utils.getByDataPath('lastname')
    this.radioButton = this.utils.getByType('radio')
    this.sameAddressCheckbox = this.utils.getByDataPath('shippingSameAsBilling')
    this.submitButton = this.selectors.submitButton
  }
}
