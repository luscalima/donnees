export class ApplicationError extends Error {
  public readonly status: number
  public readonly title: string
  public readonly detail?: string
  public readonly type?: string
  public readonly instance?: string

  constructor(
    status: number,
    title: string,
    detail?: string,
    type?: string,
    instance?: string,
  ) {
    super(detail)
    this.status = status
    this.title = title
    this.detail = detail
    this.type = type
    this.instance = instance
  }
}
