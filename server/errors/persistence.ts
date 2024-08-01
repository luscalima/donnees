import { ApplicationError } from '.'

export class PersistenceError extends ApplicationError {
  constructor(detail: string) {
    super(500, 'Persistence Error', detail)
  }
}
