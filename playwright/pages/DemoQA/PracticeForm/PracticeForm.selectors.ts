import { Locator, Page } from '@playwright/test'
import { BaseClass } from 'playwright/shared/BaseClass'

export class PracticeFormSelectors extends BaseClass {
  readonly cityOption: Locator
  readonly citySelect: Locator
  readonly closeButton: Locator
  readonly currentAddress: Locator
  readonly dateOfBirth: Locator
  readonly emailAddress: Locator
  readonly firstName: Locator
  readonly firstSubject: Locator
  readonly lastName: Locator
  readonly mobileNumber: Locator
  readonly monthSelect: Locator
  readonly stateOption: Locator
  readonly stateSelect: Locator
  readonly subjectsInput: Locator
  readonly submitButton: Locator
  readonly yearSelect: Locator

  constructor(page: Page) {
    super(page)

    this.cityOption = page.locator('[id^="react-select-4"]')
    this.citySelect = page.locator('#city')
    this.closeButton = page.locator('#closeLargeModal')
    this.currentAddress = page.locator('#currentAddress')
    this.dateOfBirth = page.locator('#dateOfBirthInput')
    this.emailAddress = page.locator('#userEmail')
    this.firstName = page.locator('#firstName')
    this.firstSubject = page.locator('#react-select-2-option-0')
    this.lastName = page.locator('#lastName')
    this.mobileNumber = page.locator('#userNumber')
    this.monthSelect = page.locator('.react-datepicker__month-select')
    this.stateOption = page.locator('[id^="react-select-3"]')
    this.stateSelect = page.locator('#state')
    this.subjectsInput = page.locator('#subjectsInput')
    this.submitButton = page.locator('#submit')
    this.yearSelect = page.locator('.react-datepicker__year-select')
  }
}
