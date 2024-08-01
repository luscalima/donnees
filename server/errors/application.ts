export class ApplicationError extends Error {
  constructor(
    public readonly status: number,
    public readonly title: string,
    public readonly detail?: string,
    public readonly type?: string,
    public readonly instance?: string,
  ) {
    super(detail)
  }

  toJSON() {
    return {
      status: this.status,
      title: this.title,
      detail: this.detail,
      type: this.type,
      instance: this.instance,
    }
  }
}
