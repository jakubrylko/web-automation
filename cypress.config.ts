import { allureCypress } from 'allure-cypress/reporter'
import { defineConfig } from 'cypress'
import 'dotenv/config'

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

    chromeWebSecurity: false,
    defaultCommandTimeout: 4000,
    pageLoadTimeout: 60000,
    retries: { runMode: 0, openMode: 0 },
    viewportHeight: 1080,
    viewportWidth: 1920,
    watchForFileChanges: false,

    specPattern: 'cypress/tests/**/*.cy.{js,ts}',
    supportFile: 'cypress/support/e2e.{js,ts}'
  }
})
