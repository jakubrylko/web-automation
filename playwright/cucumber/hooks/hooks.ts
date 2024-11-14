import { viewport } from '@common/helpers'
import { After, Before } from '@cucumber/cucumber'
import { Browser, chromium } from '@playwright/test'
import { fixture } from './fixtures'

let browser: Browser

Before(async () => {
  browser = await chromium.launch({ headless: true })
  fixture.context = await browser.newContext({ viewport: viewport.MacBook })
  fixture.page = await fixture.context.newPage()
})

After(async () => {
  await browser.close()
})
