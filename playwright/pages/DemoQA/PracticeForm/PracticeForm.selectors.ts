import { Locator, Page } from '@playwright/test'
import { BaseClass } from 'playwright/pages/BaseClass'

export class PracticeFormSelectors extends BaseClass {
  readonly citySelect: Locator
  readonly closeButton: Locator
  readonly currentAddress: Locator
  readonly dateOfBirth: Locator
  readonly emailAddress: Locator
  readonly firstCity: Locator
  readonly firstName: Locator
  readonly firstState: Locator
  readonly firstSubject: Locator
  readonly lastName: Locator
  readonly mobileNumber: Locator
  readonly monthSelect: Locator
  readonly stateSelect: Locator
  readonly subjectsInput: Locator
  readonly submitButton: Locator
  readonly yearSelect: Locator

  constructor(page: Page) {
    super(page)

    this.citySelect = page.locator('#city')
    this.closeButton = page.locator('#closeLargeModal')
    this.currentAddress = page.locator('#currentAddress')
    this.dateOfBirth = page.locator('#dateOfBirthInput')
    this.emailAddress = page.locator('#userEmail')
    this.firstCity = page.locator('#react-select-4-option-0')
    this.firstName = page.locator('#firstName')
    this.firstState = page.locator('#react-select-3-option-0')
    this.firstSubject = page.locator('#react-select-2-option-0')
    this.lastName = page.locator('#lastName')
    this.mobileNumber = page.locator('#userNumber')
    this.monthSelect = page.locator('.react-datepicker__month-select')
    this.stateSelect = page.locator('#state')
    this.subjectsInput = page.locator('#subjectsInput')
    this.submitButton = page.locator('#submit')
    this.yearSelect = page.locator('.react-datepicker__year-select')
  }
}
