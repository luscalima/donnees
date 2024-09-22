import { defineVitestConfig } from '@nuxt/test-utils/config'
import swc from 'unplugin-swc'

export default defineVitestConfig({
  plugins: [
    swc.vite({
      jsc: {
        parser: {
          syntax: 'typescript',
          dynamicImport: true,
          decorators: true,
        },
        target: 'esnext',
        transform: {
          decoratorMetadata: true,
        },
      },
    }),
  ],
  test: {
    globals: true,
    environment: 'nuxt',
    include: ['tests/**/*.test.ts'],
    setupFiles: ['tests/setup.ts'],
    coverage: {
      provider: 'istanbul',
      include: ['server/**/*.ts'],
      exclude: [
        'server/plugins/**/*.ts',
        'server/errors/**/*.ts',
        'server/repositories/**/*.ts',
      ],
    },
  },
})
