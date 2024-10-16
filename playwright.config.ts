import { defineConfig, devices, ViewportSize } from '@playwright/test'
import 'dotenv/config'

const { CI, DEVICE } = process.env

const viewport: Record<string, ViewportSize> = {
  MacBook: { width: 1536, height: 900 },
  iPad: { width: 810, height: 1080 },
  iPhone: { width: 393, height: 852 }
}

export default defineConfig({
  testDir: 'playwright/tests',
  outputDir: 'playwright/traces',
  snapshotDir: 'playwright/snapshots',

  timeout: 30000,
  expect: { timeout: 5000, toHaveScreenshot: { threshold: 0.01 } },

  fullyParallel: true,
  forbidOnly: !!CI,
  retries: CI ? 1 : 0,
  workers: CI ? 1 : undefined,

  reporter: [
    ['allure-playwright', { resultsDir: 'allure/allure-results/playwright' }],
    ['html', { open: 'never', outputFolder: 'playwright/report' }]
  ],

  use: {
    baseURL: 'https://demoqa.com',
    trace: 'on'
  },

  projects: [
    {
      name: 'Chromium',
      use: {
        ...devices['Desktop Chrome'],
        viewport: viewport[DEVICE ?? 'MacBook']
      }
    },
    {
      name: 'Firefox',
      use: {
        ...devices['Desktop Firefox'],
        viewport: viewport[DEVICE ?? 'MacBook']
      }
    },
    {
      name: 'Webkit',
      use: {
        ...devices['Desktop Safari'],
        viewport: viewport[DEVICE ?? 'MacBook']
      }
    }
  ]
})
