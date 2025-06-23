export abstract class Entity {
  public readonly id!: string;

  constructor(id?: string) {
    this.id = id ?? crypto.randomUUID();
  }

  public equals(other?: Entity): boolean {
    if (!other) return false;
    return this.id === other.id;
  }
}
