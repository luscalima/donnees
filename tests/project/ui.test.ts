import { registerEndpoint, renderSuspended } from '@nuxt/test-utils/runtime'
import { screen } from '@testing-library/vue'

// Pages
import ProjectsPage from '~/pages/projects/index.vue'

registerEndpoint('/api/projects', () => [
  {
    id: 1,
    name: 'Project 1',
  },
  {
    id: 2,
    name: 'Project 2',
  },
])

describe('UI', () => {
  it('should render the project list', async () => {
    await renderSuspended(ProjectsPage)

    expect(screen.getByText('Project 1')).toBeDefined()
    expect(screen.getByText('Project 2')).toBeDefined()
  })
})
