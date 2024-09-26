import { Project, type ProjectProps } from '../entities'
import { type ProjectRepository } from '../repositories'
import crypto from 'crypto'

export type CreateProjectInput = Omit<ProjectProps, 'id' | 'userId'>
export type UpdateProjectInput = Omit<ProjectProps, 'id' | 'userId'>

export class ProjectManager {
  constructor(
    private readonly userId: string,
    private readonly repository: ProjectRepository,
  ) {}

  async createProject(input: CreateProjectInput): Promise<Project> {
    const id = crypto.randomUUID()
    const result = await this.repository.create({
      ...input,
      id,
      userId: this.userId,
    })

    return new Project(result)
  }

  async getAllProjects(): Promise<Project[]> {
    const result = await this.repository.getAll({ userId: this.userId })

    return result.map(project => new Project(project))
  }

  async deleteProject(id: string): Promise<void> {
    await this.repository.delete(id, this.userId)
  }

  async updateProject(id: string, input: UpdateProjectInput): Promise<Project> {
    await this.repository.update(id, this.userId, input)

    return new Project({ id, userId: this.userId, ...input })
  }

  async getProjectById(id: string): Promise<Project | null> {
    const result = await this.repository.getById({ id, userId: this.userId })

    return result ? new Project(result) : null
  }
}
