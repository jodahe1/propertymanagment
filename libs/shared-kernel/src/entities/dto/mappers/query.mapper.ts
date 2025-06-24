import { QueryDto } from '../query.dto';
import { QueryOptions, PaginationOptions, SortOptions, FilterOptions } from '../../../repository/base.repository';

export class QueryMapper {
    /**
     * Converts QueryDto to QueryOptions
     * @param queryDto - The query DTO from the request
     * @param includeActiveFilter - Whether to include isActive=true filter (defaults to true)
     * @returns QueryOptions object for repository use
     */
    public static toQueryOptions(queryDto?: QueryDto, includeActiveFilter: boolean = true): QueryOptions {
        if (!queryDto) {
            return {};
        }

        const queryOptions: QueryOptions = {};

        // Map pagination options
        if (queryDto.page !== undefined || queryDto.limit !== undefined) {
            const pagination: PaginationOptions = {
                page: queryDto.page ?? 1,
                limit: queryDto.limit ?? 10,
            };

            queryOptions.pagination = pagination;
        }
        if (queryDto.q) {
            queryOptions.q = queryDto.q;
        }
        // Map sort options
        if (queryDto.sort && Array.isArray(queryDto.sort) && queryDto.sort.length > 0) {
            queryOptions.sort = queryDto.sort.map((sortItem): SortOptions => ({
                field: sortItem.field,
                direction: sortItem.direction,
            }));
        }

        // Map filter options
        if (queryDto.filters && Array.isArray(queryDto.filters) && queryDto.filters.length > 0) {
            queryOptions.filters = queryDto.filters.map((filterItem): FilterOptions => ({
                field: filterItem.field,
                operator: filterItem.operator,
                value: filterItem.value,
            }));
        }

        // Add isActive=true filter if requested
        if (includeActiveFilter) {
            const isActiveFilter: FilterOptions = {
                field: 'isActive',
                operator: 'eq',
                value: true,
            };

            if (queryOptions.filters) {
                queryOptions.filters.push(isActiveFilter);
            } else {
                queryOptions.filters = [isActiveFilter];
            }
        }

        return queryOptions;
    }    /**
     * Converts QueryDto to QueryOptions with optional populate fields
     * @param queryDto - The query DTO from the request
     * @param populate - Array of fields to populate/include in the query
     * @param includeActiveFilter - Whether to include isActive=true filter (defaults to true)
     * @returns QueryOptions object for repository use
     */
    static toQueryOptionsWithPopulate(queryDto?: QueryDto, populate?: string[], includeActiveFilter: boolean = true): QueryOptions {
        const queryOptions = this.toQueryOptions(queryDto, includeActiveFilter);

        if (populate && populate.length > 0) {
            queryOptions.populate = populate;
        }

        return queryOptions;
    }

    /**
     * Creates a basic pagination QueryOptions from page and limit
     * @param page - Page number (defaults to 1)
     * @param limit - Number of items per page (defaults to 10)
     * @returns QueryOptions with pagination
     */
    static toPaginationOptions(page: number = 1, limit: number = 10): QueryOptions {
        return {
            pagination: {
                page,
                limit,
            },
        };
    }

    /**
     * Creates QueryOptions with sorting only
     * @param field - Field to sort by
     * @param direction - Sort direction ('ASC' or 'DESC')
     * @returns QueryOptions with sort configuration
     */
    static toSortOptions(field: string, direction: 'ASC' | 'DESC' = 'ASC'): QueryOptions {
        return {
            sort: [{ field, direction }],
        };
    }

    /**
     * Creates QueryOptions with filtering only
     * @param field - Field to filter by
     * @param operator - Filter operator
     * @param value - Filter value
     * @returns QueryOptions with filter configuration
     */
    static toFilterOptions(
        field: string,
        operator: 'eq' | 'ne' | 'gt' | 'gte' | 'lt' | 'lte' | 'like' | 'in' | 'nin',
        value: any
    ): QueryOptions {
        return {
            filters: [{ field, operator, value }],
        };
    }
}
