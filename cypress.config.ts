import { defineConfig } from 'cypress'
import { getEnvVariables } from 'cypress/support/envs'

const envs = getEnvVariables()

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      Object.assign(config.env, envs)
      return config
    },
    viewportWidth: 1920,
    viewportHeight: 1080,
    chromeWebSecurity: true,
    watchForFileChanges: true,
    specPattern: 'cypress/tests/**/*.cy.{js,jsx,ts,tsx}',
    supportFile: 'cypress/support/e2e.{js,jsx,ts,tsx}'
  }
})
