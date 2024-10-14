import { defineConfig, devices } from '@playwright/test'
import 'dotenv/config'

export default defineConfig({
  testDir: './playwright/tests',
  outputDir: './playwright/test-results',
  snapshotDir: './playwright/snapshots',

  timeout: 30000,
  expect: { timeout: 5000, toHaveScreenshot: { threshold: 0.01 } },

  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,

  reporter: [
    ['allure-playwright', { resultsDir: 'allure/allure-results/playwright' }],
    ['html', { open: 'never', outputFolder: 'playwright/playwright-report' }]
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
        viewport: { width: 1920, height: 1080 }
      }
    },
    {
      name: 'firefox',
      use: {
        ...devices['Desktop Firefox'],
        viewport: { width: 1920, height: 1080 }
      }
    },
    {
      name: 'webkit',
      use: {
        ...devices['Desktop Safari'],
        viewport: { width: 1920, height: 1080 }
      }
    },
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 12'] }
    }
  ]
})
