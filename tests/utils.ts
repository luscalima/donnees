import { vi } from 'vitest'

const uuid = '50f3baea-9843-43aa-9c46-32ec0d90c28c'

const crypto = vi.fn(() => ({
  randomUUID: vi.fn(() => uuid),
}))

vi.stubGlobal('crypto', crypto)

export { uuid }
