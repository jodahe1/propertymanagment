import { EntityRepository, EntityManager } from '@mikro-orm/core';
import {
  BaseRepository,
  PaginatedResult,
  QueryOptions,
  //SafePopulatedEntity,
  PaginationOptions,
} from './base.repository';
import { Entity } from '../entities/domain/entity';

export abstract class MikroOrmBaseRepository<
  T extends Entity,
  TEntity extends object = any,
  TCreateData = any,
> extends BaseRepository<T, string, TCreateData> {
  constructor(
    protected readonly repository: EntityRepository<TEntity>,
    protected readonly em: EntityManager,
  ) {
    super();
  }

  protected abstract toDomain(entity: TEntity): T;
  protected abstract toEntity(domain: TCreateData): TEntity;
  protected abstract updateEntity(entity: TEntity, updates: T): void;

  async findById(id: string, options?: QueryOptions): Promise<T | null> {
    try {
      const entity = await this.repository.findOne({ id } as any, {
        populate: options?.populate as any,
        orderBy: this.buildOrderBy(options?.sort) as any,
      });
      return entity ? this.toDomain(entity) : null;
    } catch (error) {
      return null;
    }
  }

  async findByIdOrFail(id: string, options?: QueryOptions): Promise<T> {
    const entity = await this.repository.findOneOrFail({ id } as any, {
      populate: options?.populate as any,
      orderBy: this.buildOrderBy(options?.sort) as any,
    });
    return this.toDomain(entity);
  }

  async findOne(
    criteria: Partial<T>,
    options?: QueryOptions,
  ): Promise<T | null> {
    try {
      const entity = await this.repository.findOne(criteria as any, {
        populate: options?.populate as any,
        orderBy: this.buildOrderBy(options?.sort) as any,
      });
      return entity ? this.toDomain(entity) : null;
    } catch (error) {
      return null;
    }
  }

  async findOneOrFail(
    criteria: Partial<T>,
    options?: QueryOptions,
  ): Promise<T> {
    const entity = await this.repository.findOneOrFail(criteria as any, {
      populate: options?.populate as any,
      orderBy: this.buildOrderBy(options?.sort) as any,
    });
    return this.toDomain(entity);
  }

  async findAll(options?: QueryOptions): Promise<T[]> {
    const entities = await this.repository.findAll({
      populate: options?.populate as any,
      orderBy: this.buildOrderBy(options?.sort) as any,
      limit: options?.pagination?.limit,
      offset: this.calculateOffset(options?.pagination),
    });
    return entities.map((entity) => this.toDomain(entity));
  }

  async findPaginated(options?: QueryOptions): Promise<PaginatedResult<T>> {
    const page = options?.pagination?.page || 1;
    const limit = options?.pagination?.limit || 10;
    const offset = this.calculateOffset(options?.pagination);

    const [entities, total] = await this.repository.findAndCount(
      this.buildWhere(options?.filters),
      {
        populate: options?.populate as any,
        orderBy: this.buildOrderBy(options?.sort) as any,
        limit,
        offset,
      },
    );

    const data = entities.map((entity) => this.toDomain(entity));
    const totalPages = Math.ceil(total / limit);

    return {
      data,
      total,
      page,
      limit,
      totalPages,
      hasNext: page < totalPages,
      hasPrev: page > 1,
    };
  }

  async create(domainEntity: TCreateData): Promise<T> {
    const entity = this.toEntity(domainEntity);
    const persistedEntity = this.repository.create(entity);
    await this.em.persistAndFlush(persistedEntity);
    return this.toDomain(persistedEntity);
  }

  async update(id: string, updates: T): Promise<T> {
    const entity = await this.repository.findOneOrFail({ id } as any);
    this.updateEntity(entity, updates);
    await this.em.flush();
    return this.toDomain(entity);
  }

  async delete(id: string): Promise<boolean> {
    try {
      const entity = await this.repository.findOneOrFail({ id } as any);

      // Check if entity has an 'isActive' field
      if (
        'isActive' in entity &&
        typeof (entity as any).isActive === 'boolean'
      ) {
        // Set as inactive instead of deleting
        (entity as any).isActive = false;
        await this.em.flush();
      } else {
        // No isActive field, proceed with deletion
        await this.em.removeAndFlush(entity);
      }
      return true;
    } catch (error) {
      return false;
    }
  }

  async exists(criteria: Partial<T>): Promise<boolean> {
    const count = await this.repository.count(criteria as any);
    return count > 0;
  }

  async count(criteria?: Partial<T>): Promise<number> {
    return await this.repository.count((criteria as any) || {});
  }

  // async findWithPopulation<P extends keyof T>(
  //   criteria: Partial<T>,
  //   populate: P[],
  //   options?: QueryOptions
  // ): Promise<SafePopulatedEntity<T, P> | null> {
  //   const entity = await this.repository.findOne(
  //     criteria as any,
  //     {
  //       populate: populate as any,
  //       orderBy: this.buildOrderBy(options?.sort) as any,
  //     }
  //   );

  //   if (!entity) return null;

  //   const domainEntity = this.toDomain(entity);
  //   const populated = {} as Record<P, boolean>;

  //   // Check which relations are actually populated
  //   populate.forEach(field => {
  //     try {
  //       const fieldValue = (entity as any)[field];
  //       // Check if the field exists and is not a lazy reference
  //       populated[field] = fieldValue !== undefined && fieldValue !== null;
  //     } catch {
  //       populated[field] = false;
  //     }
  //   });

  //   return {
  //     entity: domainEntity,
  //     populated,
  //   };
  // }

  async createMany(entities: TCreateData[]): Promise<T[]> {
    const persistenceEntities = entities.map((entity) => this.toEntity(entity));
    this.em.persist(persistenceEntities);
    await this.em.flush();
    return persistenceEntities.map((entity) => this.toDomain(entity));
  }

  async updateMany(criteria: Partial<T>, updates: Partial<T>): Promise<number> {
    return await this.repository.nativeUpdate(criteria as any, updates as any);
  }

  async deleteMany(criteria: Partial<T>): Promise<number> {
    return await this.repository.nativeDelete(criteria as any);
  }

  // Helper methods
  private buildOrderBy(
    sort?: Array<{ field: string; direction: 'ASC' | 'DESC' }>,
  ) {
    if (!sort || sort.length === 0) return undefined;

    const orderBy: Record<string, 'asc' | 'desc'> = {};
    sort.forEach((s) => {
      orderBy[s.field] = s.direction.toLowerCase() as 'asc' | 'desc';
    });
    return orderBy;
  }

  private buildWhere(
    filters?: Array<{ field: string; operator: string; value: any }>,
  ) {
    if (!filters || filters.length === 0) return {};

    const where: any = {};
    filters.forEach((filter) => {
      switch (filter.operator) {
        case 'eq':
          where[filter.field] = filter.value;
          break;
        case 'ne':
          where[filter.field] = { $ne: filter.value };
          break;
        case 'gt':
          where[filter.field] = { $gt: filter.value };
          break;
        case 'gte':
          where[filter.field] = { $gte: filter.value };
          break;
        case 'lt':
          where[filter.field] = { $lt: filter.value };
          break;
        case 'lte':
          where[filter.field] = { $lte: filter.value };
          break;
        case 'like':
          where[filter.field] = { $like: `%${filter.value}%` };
          break;
        case 'in':
          where[filter.field] = { $in: filter.value };
          break;
        case 'nin':
          where[filter.field] = { $nin: filter.value };
          break;
      }
    });
    return where;
  }

  private calculateOffset(pagination?: PaginationOptions): number {
    if (!pagination) return 0;
    if (pagination.offset !== undefined) return pagination.offset;
    return (pagination.page - 1) * pagination.limit;
  }
}
