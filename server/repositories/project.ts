import { ProjectModel } from '../database/models'
import type { ProjectProps } from '../entities'
import { dataSource } from '../database'
import { PersistenceError } from '../errors'

const dao = dataSource.getRepository(ProjectModel)

export class ProjectRepository {
  async create(project: ProjectProps): Promise<ProjectProps> {
    try {
      return await dao.save(project)
    } catch {
      throw new PersistenceError('Failed to create project')
    }
  }

  async getAll(): Promise<ProjectProps[]> {
    try {
      return await dao.find()
    } catch {
      throw new PersistenceError('Failed to get all projects')
    }
  }
}
