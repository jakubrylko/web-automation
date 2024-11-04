import { DeviceType, viewport } from '@common/helpers'
import { defineConfig, devices } from '@playwright/test'
import dotenv from 'dotenv'

dotenv.config({ path: '../.env' })

const { CI, DEVICE } = process.env

const device = (DEVICE ?? 'MacBook') as DeviceType

export default defineConfig({
  testDir: 'tests',
  outputDir: 'traces',
  snapshotDir: 'snapshots',

  timeout: 30000,
  expect: { timeout: 5000, toHaveScreenshot: { threshold: 0.01 } },

  fullyParallel: true,
  forbidOnly: !!CI,
  retries: CI ? 1 : 0,
  workers: CI ? 5 : 1,

  reporter: [
    [
      'allure-playwright',
      { resultsDir: '../allure/allure-results/playwright' }
    ],
    ['html', { open: 'never', outputFolder: 'report' }],
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
