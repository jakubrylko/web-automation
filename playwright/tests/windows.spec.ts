import { SAMPLE_TEXT, MESSAGE_TEXT } from '@common/labels/windows'
import {
  MSG_WINDOW_BTN,
  PLAYGROUND_HEADER,
  TAB_BTN,
  WINDOW_BODY,
  WINDOW_BTN,
  WINDOW_HEADER,
} from '@common/selectors/windows'
import { expect, test } from '@playwright/test'

test.describe('Windows', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://demoqa.com/')
    await page.getByLabel('Consent', { exact: true }).click()

    await page.getByText('Alerts, Frame & Windows').click()
    await page.getByText('Browser Windows').click()
  })

  test.afterEach(async ({ page }) => {
    await page.bringToFront()
    await expect(page.locator(PLAYGROUND_HEADER)).toBeVisible()
  })

  test('Should open and assert new tab', async ({ page, context }) => {
    const [newTab] = await Promise.all([
      context.waitForEvent('page'),
      await page.locator(TAB_BTN).click(),
    ])

    await newTab.waitForLoadState()
    await expect(newTab.locator(WINDOW_HEADER)).toHaveText(SAMPLE_TEXT)
  })

  test('Should open and assert new window', async ({ page, context }) => {
    const [newWindow] = await Promise.all([
      context.waitForEvent('page'),
      await page.locator(WINDOW_BTN).click(),
    ])

    await newWindow.waitForLoadState()
    await expect(newWindow.locator(WINDOW_HEADER)).toHaveText(SAMPLE_TEXT)
  })

  test('Should open and assert new message window', async ({
    page,
    context,
  }) => {
    const [newMsgWindow] = await Promise.all([
      context.waitForEvent('page'),
      await page.locator(MSG_WINDOW_BTN).click(),
    ])

    await newMsgWindow.waitForLoadState()
    await expect(newMsgWindow.locator(WINDOW_BODY)).toContainText(MESSAGE_TEXT)
  })
})
