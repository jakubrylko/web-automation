import { defineConfig } from 'cypress'
import 'dotenv/config'

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      Object.assign(config.env, process.env)
      return config
    },
    baseUrl: 'https://demoqa.com',
    viewportWidth: 1920,
    viewportHeight: 1080,
    chromeWebSecurity: false,
    watchForFileChanges: true,
    specPattern: 'cypress/tests/**/*.cy.{js,ts}',
    supportFile: 'cypress/support/e2e.{js,ts}'
  }
})
