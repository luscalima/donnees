import { Entity } from '.'
import { ValidationError } from '../errors'

export interface ProjectProps {
  id: string
  userId: string
  name: string
  description?: string
}

export class Project extends Entity<ProjectProps> {
  constructor(props: ProjectProps) {
    super(props)
    this.validateName(props.name)
  }

  show(): ProjectProps {
    return {
      id: this.id,
      userId: this.userId,
      name: this.name,
      description: this.description,
    }
  }

  get id(): string {
    return this.props.id
  }

  get userId(): string {
    return this.props.userId
  }

  get name(): string {
    return this.props.name
  }

  set name(name: string) {
    this.validateName(name)
    this.props.name = name
  }

  get description(): string | undefined {
    return this.props.description
  }

  set description(description: string | undefined) {
    this.props.description = description
  }

  private validateName(name: string): void {
    if (name.length < 3) {
      throw new ValidationError('Name must be at least 3 characters long')
    }
  }
}
