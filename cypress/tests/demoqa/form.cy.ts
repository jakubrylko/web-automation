import * as LeftPanel from 'cypress/components/DemoQA/LeftPanel'
import * as Home from 'cypress/screens/DemoQA/Homepage'
import * as PracticeForm from 'cypress/screens/DemoQA/PracticeForm'

describe('Practice form', () => {
  it('Should fill and submit practice form', () => {
    cy.visit('/')
    Home.clickOnMenuCard('Form')
    LeftPanel.clickOnMenuItem('Practice Form')

    cy.fixture('form-data').then((data) => {
      PracticeForm.firstName().type(data.firstName)
      PracticeForm.lastName().type(data.lastName)
      PracticeForm.emailAddress().type(data.email)
      PracticeForm.mobileNumber().type(data.mobile)

      PracticeForm.selectGender(data.gender)
      const { day, month, year } = data.dateOfBirth
      PracticeForm.selectDateOfBirth(day, month, year)

      PracticeForm.selectSubject(data.subject)
      PracticeForm.selectHobbies(data.hobbies)
      PracticeForm.currentAddress().type(data.address)
    })

    const filePath = 'fixtures/form-data.json'
    PracticeForm.chooseFileButton().selectFile(filePath)
    PracticeForm.selectRandomState()
    PracticeForm.selectRandomCity()

    PracticeForm.submitButton().click()
    PracticeForm.assertSubmissionTitle('Thanks for submitting the form')
    PracticeForm.createCsvFromTable()
    PracticeForm.closeButton().click()
  })
})
