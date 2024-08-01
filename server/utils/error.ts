import { ApplicationError } from '../errors'

export function error(error: Error, fatal: boolean = false) {
  if (error instanceof ApplicationError) {
    return createError({
      statusCode: error.status,
      message: error.message,
      cause: error.detail,
      data: error.toJSON(),
      fatal,
    })
  }

  return createError({
    statusCode: 500,
    message: 'Internal Server Error',
    cause: 'Something went wrong',
    fatal,
  })
}
