import { describe, it, expect } from 'vitest'
import { setup } from '@nuxt/test-utils'

describe('Hello World', () => {
  setup({
    // do nothing
  })

  it('says hello', async () => {
    const greeting = 'Hello World'
    expect(greeting).toBe('Hello World')
  })
})
