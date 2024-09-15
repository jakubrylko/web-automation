import { test } from '@playwright/test'
import { closeCookieModal, clickOnMenuTab } from 'playwright/support/apptension'
import {
  clickOnDepartment,
  assertTechStack
} from 'playwright/support/tech-stack'

test.describe('Apptension careers', () => {
  test('Should return and assert tech stack count', async ({ page }) => {
    await page.goto(process.env.APPTENSION_URL!)
    await closeCookieModal(page)
    await clickOnMenuTab(page, 'Careers')

    await clickOnDepartment(page, 'Frontend')
    await assertTechStack(page, 'Frontend')

    await clickOnDepartment(page, 'Backend')
    await assertTechStack(page, 'Backend')

    await clickOnDepartment(page, 'Infrastructure')
    await assertTechStack(page, 'Infrastructure')

    await clickOnDepartment(page, 'Design')
    await assertTechStack(page, 'Design')
  })
})
