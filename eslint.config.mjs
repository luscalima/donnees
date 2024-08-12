import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt({
  rules: {
    'vue/no-multiple-template-root': 'off',
  },
}).override('nuxt/typescript/rules', {
  rules: {
    '@typescript-eslint/consistent-type-imports': ['error'],
  },
})
