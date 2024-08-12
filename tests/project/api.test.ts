import { setup, fetch } from '@nuxt/test-utils/e2e'
import { uuid } from '../utils'

// TODO: make this thing works

// vi.mock('@/server/services/project', () => ({
//   ProjectService: vi.fn().mockImplementation(() => ({
//     createProject: vi.fn().mockResolvedValue({
//       id: uuid,
//     }),
//   })),
// }))

describe.skip('Project API', async () => {
  await setup()

  it('POST /api/projects', async () => {
    const response = await fetch('/api/projects', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: 'My project',
      }),
    })
    const project = await response.json()

    expect(response.status).toBe(201)
    expect(project.id).toBe(uuid)
  })
})
