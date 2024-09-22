require('dotenv').config()

import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      config.env.EMAIL = process.env.EMAIL
      config.env.PASSWORD = process.env.PASSWORD
      config.env.TEAMDECK_URL = process.env.TEAMDECK_URL
      config.env.TEAMDECK_USERNAME = process.env.TEAMDECK_USERNAME
      config.env.TEAMDECK_PASSWORD = process.env.TEAMDECK_PASSWORD

      return config
    },
    viewportWidth: 1920,
    viewportHeight: 1080,
    chromeWebSecurity: false,
    watchForFileChanges: true,
    specPattern: 'cypress/tests/**/*.cy.{js,jsx,ts,tsx}',
    supportFile: 'cypress/support/e2e.{js,jsx,ts,tsx}',
  }
})
