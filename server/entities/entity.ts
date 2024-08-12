export abstract class Entity<T extends { id: string }> {
  constructor(readonly props: T) {}

  abstract show(): T
}
