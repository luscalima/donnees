import { ValidationError } from '~/server/errors'
import { ProjectRepository } from '~/server/repositories'
import { ProjectManager } from '~/server/managers'
import { idParamSchema } from '~/utils/idParam'

export default defineEventHandler(async event => {
  const userId = event.context.user.id
  const query = getRouterParams(event)
  const schema = idParamSchema.safeParse(query)

  if (!schema.success) {
    const message = validate(schema.error).getMessage()

    throw error(new ValidationError(message))
  }

  const projectRepository = new ProjectRepository()
  const projectService = new ProjectManager(userId, projectRepository)
  await projectService.deleteProject(schema.data.id)

  setResponseStatus(event, 204)
})
