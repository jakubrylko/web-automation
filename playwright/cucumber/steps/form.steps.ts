import { formData } from '@common/test-data'
import { Before, Given, Then, When } from '@cucumber/cucumber'
import path from 'path'
import { LeftPanelPage } from 'playwright/components/DemoQA/LeftPanel/LeftPanel.page'
import { fixture } from 'playwright/cucumber/hooks/fixtures'
import { HomePage } from 'playwright/pages/DemoQA/Homepage/Home.page'
import { PracticeFormAssertion } from 'playwright/pages/DemoQA/PracticeForm/PracticeForm.assertion'

let Home: HomePage
let LeftPanel: LeftPanelPage
let PracticeForm: PracticeFormAssertion

Before(async () => {
  Home = new HomePage(fixture.page)
  LeftPanel = new LeftPanelPage(fixture.page)
  PracticeForm = new PracticeFormAssertion(fixture.page)
})

Given('I am on the practice form page', async () => {
  await fixture.page.goto('https://demoqa.com')
  await Home.clickOnMenuCard('Forms')
  await LeftPanel.clickOnMenuItem('Practice Form')
})

When('I fill out the entire form with valid data', async () => {
  await PracticeForm.firstName.fill(formData.firstName)
  await PracticeForm.lastName.fill(formData.lastName)
  await PracticeForm.emailAddress.fill(formData.email)
  await PracticeForm.selectGender(formData.gender)
  await PracticeForm.mobileNumber.fill(formData.mobile)

  const { day, month, year } = formData.dateOfBirth
  await PracticeForm.selectDateOfBirth(day, month, year)

  await PracticeForm.selectSubject(formData.subject)
  await PracticeForm.assertSubject(formData.subject)
  await PracticeForm.selectHobbies(formData.hobbies)

  const filePath = path.resolve(process.cwd(), '../common/assets/qa.jpg')
  await PracticeForm.chooseFileButton.setInputFiles(filePath)

  await PracticeForm.currentAddress.fill(formData.address)
  await PracticeForm.selectRandomState()
  await PracticeForm.selectRandomCity()
})

When('I submit the form', async () => {
  await PracticeForm.submitButton.click()
})

Then('I should see a confirmation message', async () => {
  await PracticeForm.assertSubmissionTitle('Thanks for submitting the form')
})

Then('I should see a table displaying the submitted data', async () => {
  await PracticeForm.assertSubmittedData()
  await PracticeForm.closeButton.click()
})
