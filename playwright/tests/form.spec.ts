import {
  FIRST_NAME,
  LAST_NAME,
  EMAIL,
  MOBILE,
  DATE_OF_BIRTH,
  MONTH_SELECT,
  YEAR_SELECT,
  SUBJECTS,
  FIRST_SUBJECT,
  ADDRESS,
  STATE,
  FIRST_STATE,
  CITY,
  FIRST_CITY,
  SUBMIT,
  CLOSE
} from '@common/selectors/form'
import { expect, test } from '@playwright/test'

test.describe('Practice form', () => {
  test('Should fill and submit practice form', async ({ page }) => {
    await page.goto('/')
    await page.getByText('Forms').click()
    await page.getByText('Practice Form').click()

    await page.fill(FIRST_NAME, 'John')
    await page.fill(LAST_NAME, 'Doe')
    await page.fill(EMAIL, 'test@example.com')
    await page.fill(MOBILE, '0123456789')

    await page.getByText('Male', { exact: true }).check()
    await expect(page.getByText('Male', { exact: true })).toBeChecked()

    await page.click(DATE_OF_BIRTH)
    await page.locator(MONTH_SELECT).selectOption({ label: 'May' })
    await page.locator(YEAR_SELECT).selectOption({ label: '1990' })
    await page.getByText('15', { exact: true }).click()
    await expect(page.locator(DATE_OF_BIRTH)).toHaveAttribute(
      'value',
      '15 May 1990'
    )

    await page.fill(SUBJECTS, 'Computer')
    await page.click(FIRST_SUBJECT)
    await expect(
      page.getByText('Computer Science', { exact: true })
    ).toBeVisible()

    await page.getByText('Sports', { exact: true }).check()
    await expect(page.getByText('Sports', { exact: true })).toBeChecked()

    await page.fill(ADDRESS, 'Gorecka 1,\nPoznan,\nPoland')

    await page.click(STATE)
    await page.click(FIRST_STATE)
    await page.click(CITY)
    await page.click(FIRST_CITY)

    await page.click(SUBMIT)
    await expect(page.getByText('Thanks for submitting the form')).toBeVisible()
    await page.click(CLOSE)
  })
})
