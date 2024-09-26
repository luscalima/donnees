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

  async getAll({ userId }: { userId: string }): Promise<ProjectProps[]> {
    try {
      return await dao.find({ where: { userId }, order: { name: 'asc' } })
    } catch {
      throw new PersistenceError('Failed to get all projects')
    }
  }

  async getById({
    id,
    userId,
  }: {
    id: string
    userId: string
  }): Promise<ProjectProps | null> {
    try {
      return await dao.findOneBy({ id, userId })
    } catch {
      throw new PersistenceError('Failed to get project by id')
    }
  }

  async delete(id: string, userId: string): Promise<void> {
    try {
      await dao.delete([id, userId])
    } catch {
      throw new PersistenceError('Failed to delete project')
    }
  }

  async update(
    id: string,
    userId: string,
    project: Partial<ProjectProps>,
  ): Promise<void> {
    try {
      await dao.update([id, userId], project)
    } catch {
      throw new PersistenceError('Failed to update project')
    }
  }
}
