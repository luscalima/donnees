import { ProjectRepository } from '~/server/repositories'
import { ProjectService } from '~/server/services'

export default defineEventHandler(async () => {
  const projectRepository = new ProjectRepository()
  const projectService = new ProjectService(projectRepository)

  const projects = await projectService.getAllProjects()

  return projects.map(project => project.show())
})
