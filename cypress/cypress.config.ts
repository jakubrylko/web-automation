import { addCucumberPreprocessorPlugin } from '@badeball/cypress-cucumber-preprocessor'
import { createEsbuildPlugin } from '@badeball/cypress-cucumber-preprocessor/esbuild'
import createBundler from '@bahmutov/cypress-esbuild-preprocessor'
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
    async setupNodeEvents(on, config) {
      // Set up Allure Reporter
      allureCypress(on, config, {
        resultsDir: '../allure/allure-results/cypress'
      })

      // Set up Cucumber BDD
      await addCucumberPreprocessorPlugin(on, config)
      on(
        'file:preprocessor',
        createBundler({
          plugins: [createEsbuildPlugin(config)]
        })
      )

      // Enable parallelization
      cypressSplit(on, config)

      // Handle envs
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
    specPattern: '../**/*.{cy.ts,feature}',
    supportFile: 'support/e2e.ts',
    videosFolder: 'videos'
  }
})
