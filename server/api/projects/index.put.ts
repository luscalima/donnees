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

  if (!schema.data.id) {
    throw error(new ValidationError('Project ID is required'))
  }

  const projectRepository = new ProjectRepository()
  const projectService = new ProjectService(projectRepository)
  const project = await projectService.updateProject(
    schema.data.id,
    schema.data,
  )

  setResponseStatus(event, 200)

  return {
    id: project.id,
  }
})
