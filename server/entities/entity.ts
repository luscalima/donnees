export class Entity<T extends { id: string }> {
  constructor(readonly props: T) {}
}
