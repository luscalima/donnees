import { ValidationError } from '~/server/errors'
import { ProjectRepository } from '~/server/repositories'
import { ProjectService } from '~/server/services'
import { error, validate } from '~/server/utils'
import { projectSchema } from '~/utils/formSchemas'

export default defineEventHandler(async event => {
  const body = await readBody(event)
  const schema = projectSchema.safeParse(body)

  if (!schema.success) {
    const message = validate(schema.error).getMessage()

    throw error(new ValidationError(message))
  }

  const projectRepository = new ProjectRepository()
  const projectService = new ProjectService(projectRepository)
  const project = await projectService.createProject(schema.data)

  setResponseStatus(event, 201)

  return {
    id: project.id,
  }
})
