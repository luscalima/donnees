import { ApplicationError } from '.'

export class NotFoundError extends ApplicationError {
  constructor(detail: string) {
    super(404, 'Not Found', detail)
  }
}
