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

  it('should get all projects', async () => {
    const repositoryResult = [
      {
        id: uuid,
        name: 'Project 1',
        description: 'Description 1',
      },
      {
        id: uuid,
        name: 'Project 2',
        description: 'Description 2',
      },
    ]

    projectRepository.getAll = vi.fn().mockResolvedValue(repositoryResult)

    const result = await sut.getAllProjects()

    expect(result).toBeInstanceOf(Array)
    expect(result).toHaveLength(2)
    expect(projectRepository.getAll).toHaveBeenCalledOnce()
  })

  it('should delete a project', async () => {
    const id = uuid

    projectRepository.delete = vi.fn().mockResolvedValue(null)

    await sut.deleteProject(id)

    expect(projectRepository.delete).toHaveBeenCalledWith(id)
  })

  it('should update a project', async () => {
    const id = uuid
    const input = {
      name: 'Project 1',
      description: 'Description 1',
    }

    projectRepository.update = vi.fn().mockResolvedValue(null)

    await sut.updateProject(id, input)

    expect(projectRepository.update).toHaveBeenCalledWith(id, input)
  })
})
