import { expect } from '@playwright/test'
import { test } from 'playwright/support/my-test'
import { ai } from '@zerostep/playwright'
import { DELETE_BTN } from '@common/selectors/elements'
import { SAMPLE_TEXT } from '@common/labels/windows'

test.describe('ZeroStep', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://demoqa.com')
  })

  test('Should fill text fields', async ({ page }) => {
    const aiArgs = { page, test }

    await ai('Click on the "Elements" button', aiArgs)
    await ai('Click on the "Text Box" button', aiArgs)
    await ai('Fill the form with realistic data', aiArgs)

    const outputElement = page.locator('.border > p')
    const numOfOutputElements = await outputElement.count()
    expect(numOfOutputElements).toEqual(4)

    for (let i = 0; i < numOfOutputElements; i++) {
      const elementText = await outputElement.nth(i).textContent()
      expect(elementText?.trim()).toBeTruthy()
    }
  })

  test('Should delete all records form the table', async ({ page, ai }) => {
    await ai('Click on the "Elements" button')
    await ai('Click on the "Web Tables" button')

    const initialNumOfRows = await page.locator(DELETE_BTN).count()

    // await ai('Delete all records from the table')
    await ai('Delete first record from the table')

    const updatedNumOfRows = await page.locator(DELETE_BTN).count()
    expect(initialNumOfRows).toBeGreaterThan(updatedNumOfRows)
  })

  test('Should add new record to the table', async ({ page, ai }) => {
    await ai('Click on the "Elements" button')
    await ai('Click on the "Web Tables" button')

    const initialNumOfRows = await page.locator(DELETE_BTN).count()

    await ai('Click on the "Add" button')
    await ai([
      'Fill registration form with the valid data',
      'Click on the "Submit button"'
    ])

    const updatedNumOfRows = await page.locator(DELETE_BTN).count()
    expect(updatedNumOfRows).toBeGreaterThan(initialNumOfRows)
  })

  test('Should count all links on the page', async ({ ai }) => {
    await ai('Click on the "Elements" button')
    await ai('Click on the "Links" button')

    const numOfLinks = await ai('Get number of all links')
    expect(numOfLinks).toEqual('9')

    let textArr = []
    for (let i = 0; i < Number(numOfLinks); i++) {
      const linkText = await ai(`Get text of link at index ${i}`)
      textArr.push(linkText)
    }
    console.log(textArr)
  })

  test('Should display and assert alert', async ({ page, ai }) => {
    await ai('Click on the "Alerts, Frame & Windows" button')
    await ai('Click on the "Alerts" button')

    page.on('dialog', async (alert) => {
      console.log('🚀 alert:', alert.message())
      expect(alert.message()).toEqual('You clicked a button')
      await alert.dismiss()
    })

    await ai('Click on the first "Click me" button')
  })

  test('Should display and assert new tab', async ({ page, context }) => {
    let aiArgs = { page, test }
    await ai('Click on the "Alerts, Frame & Windows" button', aiArgs)
    await ai('Click on the "Browser Windows" button', aiArgs)

    const [newTab] = await Promise.all([
      context.waitForEvent('page'),
      await ai('Click on the "New Tab" button', aiArgs)
    ])

    aiArgs = { page: newTab, test }
    const headerText = await ai('Get h1 text', aiArgs)
    expect(headerText).toEqual(SAMPLE_TEXT)
  })
})
