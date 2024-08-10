import { ValidationError } from '~/server/errors'
import { ProjectRepository } from '~/server/repositories'
import { ProjectService } from '~/server/services'
import { idParamSchema } from '~/utils/idParam'

export default defineEventHandler(async event => {
  const query = getRouterParams(event)
  const schema = idParamSchema.safeParse(query)

  if (!schema.success) {
    const message = validate(schema.error).getMessage()

    throw error(new ValidationError(message))
  }

  const projectRepository = new ProjectRepository()
  const projectService = new ProjectService(projectRepository)
  await projectService.deleteProject(schema.data.id)

  setResponseStatus(event, 204)
})
