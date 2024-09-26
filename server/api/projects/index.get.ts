import { ProjectRepository } from '~/server/repositories'
import { ProjectManager } from '~/server/managers'

export default defineEventHandler(async event => {
  const userId = event.context.user.id
  const projectRepository = new ProjectRepository()
  const projectService = new ProjectManager(userId, projectRepository)

  const projects = await projectService.getAllProjects()

  return projects.map(project => project.show())
})
