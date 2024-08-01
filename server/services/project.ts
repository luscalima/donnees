import { Project, type ProjectProps } from '../entities'
import { type ProjectRepository } from '../repositories'
import crypto from 'crypto'

export type CreateProjectInput = Omit<ProjectProps, 'id'>

export class ProjectService {
  constructor(private readonly repository: ProjectRepository) {}

  async createProject(input: CreateProjectInput): Promise<Project> {
    const id = crypto.randomUUID()
    const result = await this.repository.create({ id, ...input })

    return new Project(result)
  }
}