import globals from 'globals'
import pluginJs from '@eslint/js'
import tseslint from 'typescript-eslint'

export default [
  { files: ['**/*.{js,ts}'] },
  { languageOptions: { globals: globals.browser } },
  { ignores: ['allure', 'playwright/playwright-report'] },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended
]
