# QueryMapper

A utility mapper for converting `QueryDto` (request DTOs) to `QueryOptions` (repository interfaces) in the E.D.G.E backend application.

## Overview

The `QueryMapper` provides a clean interface for converting query parameters from HTTP requests into the standardized `QueryOptions` format used by repositories. This ensures consistent handling of pagination, sorting, and filtering across the application.

## Installation

The mapper is part of the shared-kernel library and can be imported as:

```typescript
import { QueryMapper, QueryDto, QueryOptions } from '@shared/shared-kernel';
```

## Interfaces

### QueryDto
The input DTO that represents query parameters from HTTP requests:

```typescript
export interface QueryDto {
  page?: number;           // Page number (default: 1)
  limit?: number;          // Items per page (default: 10)
  offset?: number;         // Offset for pagination
  sort?: Array<{           // Sort configurations
    field: string;
    direction: 'ASC' | 'DESC';
  }>;
  filters?: Array<{        // Filter configurations
    field: string;
    operator: 'eq' | 'ne' | 'gt' | 'gte' | 'lt' | 'lte' | 'like' | 'in' | 'nin';
    value: any;
  }>;
}
```

### QueryOptions
The output interface used by repositories:

```typescript
export interface QueryOptions {
  pagination?: PaginationOptions;
  sort?: SortOptions[];
  filters?: FilterOptions[];
  populate?: string[];
}
```

## Methods

### `toQueryOptions(queryDto?: QueryDto): QueryOptions`

Converts a `QueryDto` to `QueryOptions`.

**Example:**
```typescript
const queryDto: QueryDto = {
  page: 2,
  limit: 20,
  sort: [{ field: 'name', direction: 'ASC' }],
  filters: [{ field: 'status', operator: 'eq', value: 'active' }]
};

const queryOptions = QueryMapper.toQueryOptions(queryDto);
// Result:
// {
//   pagination: { page: 2, limit: 20 },
//   sort: [{ field: 'name', direction: 'ASC' }],
//   filters: [{ field: 'status', operator: 'eq', value: 'active' }]
// }
```

### `toQueryOptionsWithPopulate(queryDto?: QueryDto, populate?: string[]): QueryOptions`

Converts a `QueryDto` to `QueryOptions` and adds populate fields.

**Example:**
```typescript
const queryOptions = QueryMapper.toQueryOptionsWithPopulate(queryDto, ['roles', 'permissions']);
```

### `toPaginationOptions(page: number = 1, limit: number = 10): QueryOptions`

Creates basic pagination options.

**Example:**
```typescript
const paginationOptions = QueryMapper.toPaginationOptions(3, 25);
// Result: { pagination: { page: 3, limit: 25 } }
```

### `toSortOptions(field: string, direction: 'ASC' | 'DESC' = 'ASC'): QueryOptions`

Creates sort-only options.

**Example:**
```typescript
const sortOptions = QueryMapper.toSortOptions('createdAt', 'DESC');
// Result: { sort: [{ field: 'createdAt', direction: 'DESC' }] }
```

### `toFilterOptions(field: string, operator: FilterOperator, value: any): QueryOptions`

Creates filter-only options.

**Example:**
```typescript
const filterOptions = QueryMapper.toFilterOptions('isActive', 'eq', true);
// Result: { filters: [{ field: 'isActive', operator: 'eq', value: true }] }
```

## Usage Examples

### Basic Controller Usage

```typescript
@Controller('users')
export class UserController {
  constructor(private readonly userRepository: UserRepository) {}

  @Get()
  async getUsers(@Query() queryDto: QueryDto) {
    const queryOptions = QueryMapper.toQueryOptions(queryDto);
    return await this.userRepository.findPaginated(queryOptions);
  }
}
```

### Service with Custom Logic

```typescript
@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async getActiveUsers(queryDto: QueryDto) {
    // Convert basic query
    const queryOptions = QueryMapper.toQueryOptions(queryDto);
    
    // Add business logic filters
    if (!queryOptions.filters) {
      queryOptions.filters = [];
    }
    
    queryOptions.filters.push({
      field: 'isActive',
      operator: 'eq',
      value: true
    });
    
    return await this.userRepository.findPaginated(queryOptions);
  }
}
```

### Advanced Query Building

```typescript
async getFilteredUsers(queryDto: QueryDto) {
  let queryOptions = QueryMapper.toQueryOptions(queryDto);
  
  // Ensure filters array exists
  if (!queryOptions.filters) {
    queryOptions.filters = [];
  }
  
  // Add default filters
  queryOptions.filters.push(
    { field: 'deletedAt', operator: 'eq', value: null }
  );
  
  // Add default sorting if none provided
  if (!queryOptions.sort || queryOptions.sort.length === 0) {
    queryOptions.sort = [{ field: 'createdAt', direction: 'DESC' }];
  }
  
  // Always populate roles
  queryOptions.populate = ['roles'];
  
  return await this.userRepository.findPaginated(queryOptions);
}
```

## Filter Operators

The mapper supports the following filter operators:

- `eq` - Equals
- `ne` - Not equals
- `gt` - Greater than
- `gte` - Greater than or equal
- `lt` - Less than
- `lte` - Less than or equal
- `like` - Pattern matching (SQL LIKE)
- `in` - Value in array
- `nin` - Value not in array

## Default Values

- `page`: 1 (if not provided)
- `limit`: 10 (if not provided)
- `sort.direction`: 'ASC' (if not provided)

## Error Handling

The mapper gracefully handles:
- `undefined` or `null` queryDto (returns empty QueryOptions)
- Missing pagination parameters (uses defaults)
- Empty arrays for sort/filters (ignores them)

## Testing

The mapper includes comprehensive unit tests. Run them with:

```bash
npm test -- query.mapper.spec.ts
```

## Integration with Existing Code

The mapper integrates seamlessly with the existing repository pattern in the E.D.G.E backend. All repositories extending `BaseRepository` can use the `QueryOptions` interface returned by this mapper.
