import { ApplicationError } from '.'

export class ValidationError extends ApplicationError {
  constructor(detail: string) {
    super(400, 'Validation Error', detail)
  }
}
