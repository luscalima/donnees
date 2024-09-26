import { ApplicationError } from '.'

export class UnauthorizedError extends ApplicationError {
  constructor(detail: string) {
    super(401, 'Unauthorized', detail)
  }
}
