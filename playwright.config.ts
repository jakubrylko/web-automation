import { defineConfig, devices } from '@playwright/test'
import { DeviceType, viewport } from 'common/helpers'
import 'dotenv/config'

const { CI, DEVICE } = process.env

const device = (DEVICE ?? 'MacBook') as DeviceType

export default defineConfig({
  testDir: 'playwright/tests',
  outputDir: 'playwright/traces',
  snapshotDir: 'playwright/snapshots',

  timeout: 30000,
  expect: { timeout: 5000, toHaveScreenshot: { threshold: 0.01 } },

  fullyParallel: true,
  forbidOnly: !!CI,
  retries: CI ? 1 : 0,
  workers: CI ? 5 : undefined,

  reporter: [
    ['allure-playwright', { resultsDir: 'allure/allure-results/playwright' }],
    ['html', { open: 'never', outputFolder: 'playwright/report' }],
    ['list']
  ],

  use: {
    baseURL: 'https://demoqa.com',
    trace: 'on'
  },

  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        viewport: viewport[device]
      }
    },
    {
      name: 'firefox',
      use: {
        ...devices['Desktop Firefox'],
        viewport: viewport[device]
      }
    },
    {
      name: 'webkit',
      use: {
        ...devices['Desktop Safari'],
        viewport: viewport[device]
      }
    }
  ]
})
