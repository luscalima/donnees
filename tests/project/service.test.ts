import { Project } from '~/server/entities'
import { ProjectRepository } from '~/server/repositories'
import { ProjectService } from '~/server/services'
import { uuid } from '../utils'

describe('ProjectService', () => {
  let projectRepository: ProjectRepository
  let sut: ProjectService

  beforeEach(() => {
    projectRepository = new ProjectRepository()
    sut = new ProjectService(projectRepository)
  })

  it('should create a new project', async () => {
    const input = {
      name: 'Project 1',
      description: 'Description 1',
    }
    const repositoryResult = {
      id: uuid,
      ...input,
    }

    projectRepository.create = vi.fn().mockResolvedValue(repositoryResult)

    const result = await sut.createProject(input)

    expect(result).toBeInstanceOf(Project)
    expect(result.id).toBeDefined()
    expect(projectRepository.create).toHaveBeenCalledOnce()
  })
})
