import { IsOptional, IsNumber, IsString, IsIn, IsArray, ValidateNested, IsNotEmpty } from 'class-validator';
import { Type, Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class QueryDto {
  // Pagination options
  @ApiProperty({ required: false, default: 1, description: 'Page number for pagination (must be >= 1)' })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  page?: number = 1;

  @ApiProperty({ required: false, default: 10, description: 'Number of items per page (must be >= 1)' })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  limit?: number = 10;

  @ApiProperty({ required: false })
  @IsOptional()
  q?: string;
  // Sorting options
  @ApiProperty({
    required: false,
    description: 'Array of sort configurations. Each item should have field and direction properties',
    example: [
      { field: 'name', direction: 'ASC' },
      { field: 'createdAt', direction: 'DESC' }]
  })
  @IsOptional()
  @Transform(({ value }) => {
    if (!value) return undefined;
    if (Array.isArray(value)) return value;
    if (typeof value === 'string') {
      try {
        // Handle URL-encoded string parameters
        return [JSON.parse(value)];
      } catch {
        // If JSON parsing fails, try to parse simple format like "field: 'name', direction: 'ASC'"
        const matches = value.match(/field:\s*['"](.*?)['"],\s*direction:\s*['"](.*?)['"]/);
        if (matches) {
          return [{ field: matches[1], direction: matches[2] as 'ASC' | 'DESC' }];
        }
        return undefined;
      }
    }
    return value;
  })
  sort?: {
    field: string;
    direction: 'ASC' | 'DESC';
  }[];
  // Filtering options
  @ApiProperty({
    required: false,
    description: 'Array of filter configurations. Each item should have field, operator, and value properties',
    example: [
      { field: 'status', operator: 'eq', value: 'active' },
      { field: 'age', operator: 'gte', value: 18 }
    ]
  })
  @IsOptional()
  @Transform(({ value }) => {
    if (!value) return undefined;
    if (Array.isArray(value)) return value;
    if (typeof value === 'string') {
      try {
        // Handle URL-encoded string parameters
        return [JSON.parse(value)];
      } catch {
        // If JSON parsing fails, try to parse simple format like "field: 'status', operator: 'eq', value: 'active'"
        const matches = value.match(/field:\s*['"](.*?)['"],\s*operator:\s*['"](.*?)['"],\s*value:\s*['"](.*?)['"]/);
        if (matches) {
          return [{
            field: matches[1],
            operator: matches[2] as 'eq' | 'ne' | 'gt' | 'gte' | 'lt' | 'lte' | 'like' | 'in' | 'nin',
            value: matches[3]
          }];
        }
        return undefined;
      }
    }
    return value;
  })
  filters?: {
    field: string;
    operator: 'eq' | 'ne' | 'gt' | 'gte' | 'lt' | 'lte' | 'like' | 'in' | 'nin';
    value: any;
  }[];
}