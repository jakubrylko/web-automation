import * as Home from 'cypress/screens/DemoQA/Homepage'
import * as LeftPanel from 'cypress/components/DemoQA/LeftPanel'
import * as PracticeForm from 'cypress/screens/DemoQA/PracticeForm'

describe('Practice form', () => {
  it('Should fill and submit practice form', () => {
    cy.visit('/')
    Home.clickOnMenuCard('Form')
    LeftPanel.clickOnMenuItem('Practice Form')

    PracticeForm.firstName().type('John')
    PracticeForm.lastName().type('Doe')
    PracticeForm.emailAddress().type('test@example.com')
    PracticeForm.mobileNumber().type('0123456789')

    PracticeForm.selectGender('Male')
    PracticeForm.selectDateOfBirth('1', 'August', '1990')

    PracticeForm.selectSubject('Computer')
    PracticeForm.assertSubject('Computer Science')
    PracticeForm.selectHobbies(['Sports', 'Music'])

    PracticeForm.currentAddress().type('Gorecka 1,\nPoznan,\nPoland')
    PracticeForm.selectRandomState()
    PracticeForm.selectRandomCity()

    PracticeForm.submitButton().click()
    PracticeForm.assertSubmissionTitle('Thanks for submitting the form')
    PracticeForm.closeButton().click()
  })
})
