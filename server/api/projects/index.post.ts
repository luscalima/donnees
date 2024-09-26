import { ValidationError } from '~/server/errors'
import { ProjectRepository } from '~/server/repositories'
import { ProjectManager } from '~/server/managers'
import { error, validate } from '~/server/utils'
import { projectSchema } from '~/utils/formSchemas'

export default defineEventHandler(async event => {
  const userId = event.context.user.id
  const body = await readBody(event)
  const schema = projectSchema.safeParse(body)

  if (!schema.success) {
    const message = validate(schema.error).getMessage()

    throw error(new ValidationError(message))
  }

  const projectRepository = new ProjectRepository()
  const projectService = new ProjectManager(userId, projectRepository)
  const project = await projectService.createProject(schema.data)

  setResponseStatus(event, 201)

  return {
    id: project.id,
  }
})
