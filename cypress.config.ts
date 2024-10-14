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
    viewportWidth: 1920,
    viewportHeight: 1080,
    chromeWebSecurity: false,
    watchForFileChanges: false,
    specPattern: 'cypress/tests/**/*.cy.{js,ts}',
    supportFile: 'cypress/support/e2e.{js,ts}'
  }
})
