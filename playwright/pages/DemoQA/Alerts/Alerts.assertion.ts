import { expect, Page } from '@playwright/test'
import { AlertsPage } from './Alerts.page'

export class AlertsAssertion extends AlertsPage {
  constructor(page: Page) {
    super(page)
  }

  async assertAlertMessage(message: string) {
    this.page.on('dialog', async (alert) =>
      expect(alert.message()).toEqual(message)
    )
  }
}
