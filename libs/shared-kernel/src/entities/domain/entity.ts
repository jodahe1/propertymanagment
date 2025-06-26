import * as crypto from 'crypto';
export abstract class Entity {
  protected _id!: string;
  get id() { return this._id; }

  //Only used during persistence response
  protected _createdAt?: Date;
  get createdAt() { return this._createdAt; }
  protected _updatedAt?: Date;
  get updatedAt() { return this._updatedAt; }

  protected _createdBy?: string;
  get createdBy() { return this._createdBy; }
  protected _updatedBy?: string;
  get updatedBy() { return this._updatedBy; }

  constructor(
    id?: string,
    createdAt?: Date,
    updatedAt?: Date,
    createdBy?: string,
    updatedBy?: string,
  ) {
    this._id = id ?? crypto.randomUUID();
    this._createdAt = createdAt;
    this._updatedAt = updatedAt;
    this._createdBy = createdBy;
    this._updatedBy = updatedBy;
  }

  public equals(other?: Entity): boolean {
    if (!other) return false;
    return this.id === other.id;
  }
}
