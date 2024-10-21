import { allureCypress } from 'allure-cypress/reporter'
import { defineConfig } from 'cypress'
import { viewport } from './common'
import 'dotenv/config'

const { CI, DEVICE } = process.env

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      allureCypress(on, config, {
        resultsDir: 'allure/allure-results/cypress'
      })

      Object.assign(config.env, process.env)
      return config
    },

    baseUrl: 'https://demoqa.com',
    video: CI ? true : false,
    chromeWebSecurity: false,
    defaultCommandTimeout: 4000,
    pageLoadTimeout: 60000,
    retries: { runMode: CI ? 1 : 0, openMode: 0 },
    viewportHeight: viewport[DEVICE ?? 'MacBook'].height,
    viewportWidth: viewport[DEVICE ?? 'MacBook'].width,
    watchForFileChanges: false,

    specPattern: 'cypress/tests/**/*.cy.ts',
    supportFile: 'cypress/support/e2e.ts'
  }
})
