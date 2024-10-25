declare module 'allure-cypress/reporter' {
  import type Cypress from 'cypress'
  import type { AllureCypressConfig } from './model.js'

  export const allureCypress: (
    on: Cypress.PluginEvents,
    cypressConfig?: Cypress.PluginConfigOptions,
    allureConfig?: AllureCypressConfig
  ) => AllureCypress
}
