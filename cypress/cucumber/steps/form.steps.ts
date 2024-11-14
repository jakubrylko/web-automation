import { Given, Then, When } from '@badeball/cypress-cucumber-preprocessor'
import { formData } from '@common/test-data'
import * as LeftPanel from 'cypress/components/DemoQA/LeftPanel'
import * as Home from 'cypress/screens/DemoQA/Homepage'
import * as PracticeForm from 'cypress/screens/DemoQA/PracticeForm'

Given('I am on the practice form page', () => {
  cy.visit('/')
  Home.clickOnMenuCard('Form')
  LeftPanel.clickOnMenuItem('Practice Form')
})

When('I fill out the entire form with valid data', () => {
  PracticeForm.firstName().type(formData.firstName)
  PracticeForm.lastName().type(formData.lastName)
  PracticeForm.emailAddress().type(formData.email)
  PracticeForm.selectGender(formData.gender)
  PracticeForm.mobileNumber().type(formData.mobile)

  const { day, month, year } = formData.dateOfBirth
  PracticeForm.selectDateOfBirth(day, month, year)

  PracticeForm.selectSubject(formData.subject)
  PracticeForm.selectHobbies(formData.hobbies)

  const filePath = '../common/assets/qa.jpg'
  PracticeForm.chooseFileButton().selectFile(filePath)

  PracticeForm.currentAddress().type(formData.address)
  PracticeForm.selectRandomState()
  PracticeForm.selectRandomCity()
})

When('I submit the form', () => {
  PracticeForm.submitButton().click()
})

Then('I should see a confirmation message', () => {
  PracticeForm.assertSubmissionTitle('Thanks for submitting the form')
})

Then('I should see a table displaying the submitted data', () => {
  PracticeForm.assertSubmittedData()
  PracticeForm.closeButton().click()
})
