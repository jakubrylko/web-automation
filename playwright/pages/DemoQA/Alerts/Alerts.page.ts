import { Page } from '@playwright/test'
import { AlertsSelectors } from './Alerts.selectors'

export class AlertsPage extends AlertsSelectors {
  constructor(page: Page) {
    super(page)
  }

  async dismissAlert() {
    this.page.on('dialog', async (alert) => await alert.dismiss())
  }
}
