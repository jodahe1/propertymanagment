import { QueryMapper } from '../mappers/query.mapper';
import { QueryDto } from '../entities/query.dto';

describe('QueryMapper', () => {
  describe('toQueryOptions', () => {
    it('should convert QueryDto to QueryOptions', () => {
      const queryDto: QueryDto = {
        page: 2,
        limit: 20,
        sort: [
          { field: 'name', direction: 'ASC' },
          { field: 'createdAt', direction: 'DESC' }
        ],
        filters: [
          { field: 'status', operator: 'eq', value: 'active' },
          { field: 'age', operator: 'gte', value: 18 }
        ]
      };

      const result = QueryMapper.toQueryOptions(queryDto);

      expect(result).toEqual({
        pagination: {
          page: 2,
          limit: 20,
          offset: 20
        },
        sort: [
          { field: 'name', direction: 'ASC' },
          { field: 'createdAt', direction: 'DESC' }
        ],
        filters: [
          { field: 'status', operator: 'eq', value: 'active' },
          { field: 'age', operator: 'gte', value: 18 }
        ]
      });
    });

    it('should handle undefined queryDto', () => {
      const result = QueryMapper.toQueryOptions(undefined);
      expect(result).toEqual({});
    });

    it('should handle empty queryDto', () => {
      const queryDto: QueryDto = {};
      const result = QueryMapper.toQueryOptions(queryDto);
      expect(result).toEqual({});
    });

    it('should use default pagination values', () => {
      const queryDto: QueryDto = {
        page: undefined,
        limit: undefined
      };
      const result = QueryMapper.toQueryOptions(queryDto);
      expect(result.pagination).toEqual({
        page: 1,
        limit: 10
      });
    });
  });

  describe('toQueryOptionsWithPopulate', () => {
    it('should add populate fields to QueryOptions', () => {
      const queryDto: QueryDto = {
        page: 1,
        limit: 10
      };
      const populate = ['roles', 'permissions'];

      const result = QueryMapper.toQueryOptionsWithPopulate(queryDto, populate);

      expect(result).toEqual({
        pagination: {
          page: 1,
          limit: 10
        },
        populate: ['roles', 'permissions']
      });
    });
  });

  describe('toPaginationOptions', () => {
    it('should create pagination options with defaults', () => {
      const result = QueryMapper.toPaginationOptions();
      expect(result).toEqual({
        pagination: {
          page: 1,
          limit: 10
        }
      });
    });

    it('should create pagination options with custom values', () => {
      const result = QueryMapper.toPaginationOptions(3, 25);
      expect(result).toEqual({
        pagination: {
          page: 3,
          limit: 25
        }
      });
    });
  });

  describe('toSortOptions', () => {
    it('should create sort options with defaults', () => {
      const result = QueryMapper.toSortOptions('name');
      expect(result).toEqual({
        sort: [{ field: 'name', direction: 'ASC' }]
      });
    });

    it('should create sort options with custom direction', () => {
      const result = QueryMapper.toSortOptions('createdAt', 'DESC');
      expect(result).toEqual({
        sort: [{ field: 'createdAt', direction: 'DESC' }]
      });
    });
  });

  describe('toFilterOptions', () => {
    it('should create filter options', () => {
      const result = QueryMapper.toFilterOptions('status', 'eq', 'active');
      expect(result).toEqual({
        filters: [{ field: 'status', operator: 'eq', value: 'active' }]
      });
    });
  });
});
