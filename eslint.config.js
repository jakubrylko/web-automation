import globals from 'globals'
import pluginJs from '@eslint/js'
import tseslint from 'typescript-eslint'

export default [
  { files: ['**/*.{js,ts}'] },
  { languageOptions: { globals: globals.browser } },
  {
    ignores: ['types/playwright.d.ts']
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended
]
