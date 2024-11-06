import { test } from '@playwright/test'
import path from 'path'
import { LeftPanelPage } from 'playwright/components/DemoQA/LeftPanel/LeftPanel.page'
import { HomePage } from 'playwright/pages/DemoQA/Homepage/Home.page'
import { PracticeFormAssertion } from 'playwright/pages/DemoQA/PracticeForm/PracticeForm.assertion'

test.describe('Practice form', () => {
  test('Should fill and submit practice form', async ({ page }) => {
    const Home = new HomePage(page)
    const LeftPanel = new LeftPanelPage(page)
    const PracticeForm = new PracticeFormAssertion(page)

    await page.goto('/')
    await Home.clickOnMenuCard('Forms')
    await LeftPanel.clickOnMenuItem('Practice Form')

    await PracticeForm.firstName.fill('John')
    await PracticeForm.lastName.fill('Doe')
    await PracticeForm.emailAddress.fill('test@example.com')
    await PracticeForm.mobileNumber.fill('0123456789')

    await PracticeForm.selectGender('Male')
    await PracticeForm.selectDateOfBirth('1', 'August', '1990')

    await PracticeForm.selectSubject('Computer')
    await PracticeForm.assertSubject('Computer Science')
    await PracticeForm.selectHobbies(['Sports', 'Music'])

    const filePath = path.resolve(__dirname, 'common/assets/qa.jpg')
    await PracticeForm.chooseFileButton.setInputFiles(filePath)

    await PracticeForm.currentAddress.fill('Gorecka 1,\nPoznan,\nPoland')
    await PracticeForm.selectRandomState()
    await PracticeForm.selectRandomCity()

    await PracticeForm.submitButton.click()
    await PracticeForm.assertSubmissionTitle('Thanks for submitting the form')
    await PracticeForm.closeButton.click()
  })
})
