import { type ZodError } from 'zod'

export function validate(error: ZodError) {
  const errors = error.errors
  const firstError = errors.at(0) ?? { message: 'Unknown error' }

  function getMessage(): string {
    return firstError.message
  }

  return {
    getMessage,
  }
}
