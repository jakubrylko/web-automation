import pluginJs from '@eslint/js'
import globals from 'globals'
import tseslint from 'typescript-eslint'

export default [
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,

  {
    files: ['**/*.{js,ts}'],
    languageOptions: { globals: globals.browser }
  },
  {
    rules: {
      '@typescript-eslint/no-unused-expressions': 'off'
    }
  },
  {
    ignores: ['allure', 'cypress/artifacts', 'playwright/artifacts']
  }
]
