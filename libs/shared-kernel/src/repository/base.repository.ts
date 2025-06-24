import { Entity } from '../entities/domain/entity';

export interface PaginationOptions {
  page: number;
  limit: number;
  offset?: number;
}

export interface SortOptions {
  field: string;
  direction: 'ASC' | 'DESC';
}

export interface FilterOptions {
  field: string;
  operator: 'eq' | 'ne' | 'gt' | 'gte' | 'lt' | 'lte' | 'like' | 'in' | 'nin';
  value: any;
}

export interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export interface QueryOptions {
  pagination?: PaginationOptions;
  sort?: SortOptions[];
  filters?: FilterOptions[];
  populate?: string[];
  q?: string; // Search query
}

// export interface SafePopulatedEntity<T, P extends keyof T = never> {
//   entity: T;
//   populated: Record<P, boolean>;
// }

export abstract class BaseRepository<
  T extends Entity,
  TId = string,
  TCreateData = any,
> {
  abstract findById(id: TId, options?: QueryOptions): Promise<T | null>;
  abstract findByIdOrFail(id: TId, options?: QueryOptions): Promise<T>;
  abstract findOne(
    criteria: Partial<T>,
    options?: QueryOptions,
  ): Promise<T | null>;
  abstract findOneOrFail(
    criteria: Partial<T>,
    options?: QueryOptions,
  ): Promise<T>;
  abstract findAll(options?: QueryOptions): Promise<T[]>;
  abstract findPaginated(options?: QueryOptions): Promise<PaginatedResult<T>>;
  abstract create(entity: TCreateData): Promise<T>;
  abstract update(id: TId, updates: Partial<T>): Promise<T>;
  abstract delete(id: TId): Promise<boolean>;
  abstract exists(criteria: Partial<T>): Promise<boolean>;
  abstract count(criteria?: Partial<T>): Promise<number>;

  // Safe population with type checking
  // abstract findWithPopulation<P extends keyof T>(
  //   criteria: Partial<T>,
  //   populate: P[],
  //   options?: QueryOptions
  // ): Promise<SafePopulatedEntity<T, P> | null>;

  // Batch operations
  abstract createMany(entities: TCreateData[]): Promise<T[]>;
  abstract updateMany(
    criteria: Partial<T>,
    updates: Partial<T>,
  ): Promise<number>;
  abstract deleteMany(criteria: Partial<T>): Promise<number>;
}
