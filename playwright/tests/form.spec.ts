import { test } from '@playwright/test'
import { LeftPanelPage } from 'playwright/components/DemoQA/LeftPanel/LeftPanel.page'
import { HomePage } from 'playwright/pages/DemoQA/Homepage/Home.page'
import { PracticeFormAssertion } from 'playwright/pages/DemoQA/PracticeForm/PracticeForm.assertion'

test.describe('Practice form', () => {
  test('Should fill and submit practice form', async ({ page }) => {
    const Home = new HomePage(page)
    const LeftPanel = new LeftPanelPage(page)
    const PracticeForm = new PracticeFormAssertion(page)

    await page.goto('/')
    await Home.clickOnCard('Forms')
    await LeftPanel.clickOnMenuItem('Practice Form')

    await PracticeForm.firstName.fill('John')
    await PracticeForm.lastName.fill('Doe')
    await PracticeForm.emailAddress.fill('test@example.com')
    await PracticeForm.mobileNumber.fill('0123456789')

    await PracticeForm.selectGender('Male')
    await PracticeForm.selectDateOfBirth('15', 'May', '1990')

    await PracticeForm.selectSubject('Computer')
    await PracticeForm.assertSubject('Computer Science')
    await PracticeForm.selectHobbies(['Sports', 'Music'])

    await PracticeForm.currentAddress.fill('Gorecka 1,\nPoznan,\nPoland')
    await PracticeForm.selectFirstState()
    await PracticeForm.selectFirstCity()

    await PracticeForm.submitButton.click()
    await PracticeForm.assertSubmissionTitle('Thanks for submitting the form')
    await PracticeForm.closeButton.click()
  })
})
