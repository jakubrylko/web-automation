import { expect } from '@playwright/test'
import { test } from 'playwright/support/my-test'
import { ai } from '@zerostep/playwright'
import { SAMPLE_PAGE } from 'common/test-data'
import { TextBoxAssertion } from 'playwright/pages/DemoQA/TextBox/TextBox.assertion'
import { TablesPage } from 'playwright/pages/DemoQA/Tables/Tables.page'
import { LinksAssertion } from 'playwright/pages/DemoQA/Links/Links.assertion'
import { AlertsAssertion } from 'playwright/pages/DemoQA/Alerts/Alerts.assertion'

test.describe('ZeroStep AI', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('Should fill text fields', async ({ page }) => {
    const TextBox = new TextBoxAssertion(page)
    const aiArgs = { page, test }

    await ai('Click on the "Elements" button', aiArgs)
    await ai('Click on the "Text Box" button', aiArgs)
    await ai('Fill the form with realistic data', aiArgs)

    await TextBox.assertOutputData({ count: 4 })
  })

  test('Should delete all records form the table', async ({ page, ai }) => {
    const Tables = new TablesPage(page)

    await ai('Click on the "Elements" button')
    await ai('Click on the "Web Tables" button')

    const initialNumOfRows = await Tables.countRows()

    // await ai('Delete all records from the table')
    await ai('Delete first record from the table')

    const updatedNumOfRows = await Tables.countRows()
    expect(initialNumOfRows).toBeGreaterThan(updatedNumOfRows)
  })

  test('Should add new record to the table', async ({ page, ai }) => {
    const Tables = new TablesPage(page)

    await ai('Click on the "Elements" button')
    await ai('Click on the "Web Tables" button')

    const initialNumOfRows = await Tables.countRows()
    await ai('Click on the "Add" button')

    // await ai([
    //   'Fill registration form with the valid data',
    //   'Click on the "Submit" button'
    // ])

    await ai('Fill registration form with the valid data')
    await ai('Click on the "Submit" button')

    const updatedNumOfRows = await Tables.countRows()
    expect(updatedNumOfRows).toBeGreaterThan(initialNumOfRows)
  })

  test('Should count all links on the page', async ({ page, ai }) => {
    const { link } = new LinksAssertion(page)

    await ai('Click on the "Elements" button')
    await ai('Click on the "Links" button')

    const numOfLinks = await ai(`Get number of all ${link}`)
    const textArr = await Promise.all(
      Array.from({ length: Number(numOfLinks) }, (_, i) =>
        ai(`Get text of ${link} at index ${i}`)
      )
    )

    console.log(textArr)
  })

  test('Should display alert', async ({ page, ai }) => {
    const Alerts = new AlertsAssertion(page)

    await ai('Click on the "Alerts, Frame & Windows" button')
    await ai('Click on the "Alerts" button')
    await ai('Click on the first "Click me" button')

    Alerts.assertAlertMessage('You clicked a button')
    Alerts.dismissAlert()
  })

  test('Should display new tab', async ({ page, context }) => {
    let aiArgs = { page, test }
    await ai('Click on the "Alerts, Frame & Windows" button', aiArgs)
    await ai('Click on the "Browser Windows" button', aiArgs)

    const [newTab] = await Promise.all([
      context.waitForEvent('page'),
      await ai('Click on the "New Tab" button', aiArgs)
    ])

    aiArgs = { page: newTab, test }
    const headerText = await ai('Get h1 text', aiArgs)
    expect(headerText).toEqual(SAMPLE_PAGE)
  })
})
