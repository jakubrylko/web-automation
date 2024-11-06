import { DeviceType, viewport } from '@common/helpers'
import { allureCypress } from 'allure-cypress/reporter'
import { defineConfig } from 'cypress'
import cypressSplit from 'cypress-split'
import dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: path.resolve(__dirname, '../.env') })

const { CI, DEVICE } = process.env

const device = (DEVICE ?? 'MacBook') as DeviceType

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      allureCypress(on, config, {
        resultsDir: '../allure/allure-results/cypress'
      })

      cypressSplit(on, config)

      Object.assign(config.env, process.env)
      return config
    },

    baseUrl: 'https://demoqa.com',
    chromeWebSecurity: false,
    defaultCommandTimeout: 4000,
    pageLoadTimeout: 60000,
    retries: { runMode: CI ? 1 : 0, openMode: 0 },
    video: CI ? true : false,
    viewportHeight: viewport[device].height,
    viewportWidth: viewport[device].width,
    watchForFileChanges: false,

    downloadsFolder: 'downloads',
    fixturesFolder: 'fixtures',
    screenshotsFolder: 'screenshots',
    specPattern: 'tests/**/*.cy.ts',
    supportFile: 'support/e2e.ts',
    videosFolder: 'videos'
  }
})
