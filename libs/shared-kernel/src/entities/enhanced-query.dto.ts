import {
  IsOptional,
  IsNumber,
  IsString,
  IsIn,
  IsArray,
  ValidateNested,
  IsNotEmpty,
  Min,
  Max,
  IsEnum,
  ArrayMinSize,
  ArrayMaxSize,
} from 'class-validator';
import { Type, Transform } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsValidPaginationLimit } from '../validation/custom-validators';

export class EnhancedPaginationOptionsDto {
  @ApiPropertyOptional({
    description: 'Page number (1-based)',
    minimum: 1,
    maximum: 1000,
    default: 1,
    example: 1
  })
  @IsOptional()
  @IsNumber({}, { message: 'Page must be a number' })
  @Min(1, { message: 'Page must be at least 1' })
  @Max(1000, { message: 'Page cannot exceed 1000' })
  @Type(() => Number)
  page?: number = 1;

  @ApiPropertyOptional({
    description: 'Items per page',
    minimum: 1,
    maximum: 100,
    default: 10,
    example: 10
  })
  @IsOptional()
  @IsValidPaginationLimit({ message: 'Limit must be between 1 and 100' })
  @Type(() => Number)
  limit?: number = 10;

  @ApiPropertyOptional({
    description: 'Offset for cursor-based pagination',
    minimum: 0,
    example: 0
  })
  @IsOptional()
  @IsNumber({}, { message: 'Offset must be a number' })
  @Min(0, { message: 'Offset cannot be negative' })
  @Type(() => Number)
  offset?: number;
}

// Enhanced sort options with enum validation
export enum SortDirection {
  ASC = 'ASC',
  DESC = 'DESC',
}

export class EnhancedSortOptionsDto {
  @ApiProperty({
    description: 'Field to sort by',
    example: 'email'
  })
  @IsString({ message: 'Sort field must be a string' })
  @IsNotEmpty({ message: 'Sort field cannot be empty' })
  field: string;

  @ApiProperty({
    description: 'Sort direction',
    enum: SortDirection,
    example: SortDirection.ASC
  })
  @IsEnum(SortDirection, { message: 'Sort direction must be ASC or DESC' })
  direction: SortDirection;
}

export enum FilterOperator {
  EQ = 'eq',
  NE = 'ne',
  GT = 'gt',
  GTE = 'gte',
  LT = 'lt',
  LTE = 'lte',
  LIKE = 'like',
  IN = 'in',
  NIN = 'nin',
}

export class EnhancedFilterOptionsDto {
  @ApiProperty({
    description: 'Field to filter on',
    example: 'email'
  })
  @IsString({ message: 'Filter field must be a string' })
  @IsNotEmpty({ message: 'Filter field cannot be empty' })
  field: string;

  @ApiProperty({
    description: 'Filter operator',
    enum: FilterOperator,
    example: FilterOperator.LIKE
  })
  @IsEnum(FilterOperator, { message: 'Invalid filter operator' })
  operator: FilterOperator;

  @ApiProperty({
    description: 'Value to filter by',
    example: 'john@example.com'
  })
  @IsNotEmpty({ message: 'Filter value cannot be empty' })
  value: any;
}

export class EnhancedQueryDto {
  @ApiPropertyOptional({
    description: 'Pagination options',
    type: () => EnhancedPaginationOptionsDto
  })
  @IsOptional()
  @ValidateNested({ message: 'Invalid pagination options' })
  @Type(() => EnhancedPaginationOptionsDto)
  pagination?: EnhancedPaginationOptionsDto;

  @ApiPropertyOptional({
    description: 'Sort options (max 3 sort criteria)',
    type: [EnhancedSortOptionsDto],
    maxItems: 3
  })
  @IsOptional()
  @IsArray({ message: 'Sort must be an array' })
  @ArrayMaxSize(3, { message: 'Maximum 3 sort criteria allowed' })
  @ValidateNested({ each: true, message: 'Invalid sort options' })
  @Type(() => EnhancedSortOptionsDto)
  sort?: EnhancedSortOptionsDto[];

  @ApiPropertyOptional({
    description: 'Filter options (max 10 filters)',
    type: [EnhancedFilterOptionsDto],
    maxItems: 10
  })
  @IsOptional()
  @IsArray({ message: 'Filters must be an array' })
  @ArrayMaxSize(10, { message: 'Maximum 10 filters allowed' })
  @ValidateNested({ each: true, message: 'Invalid filter options' })
  @Type(() => EnhancedFilterOptionsDto)
  filters?: EnhancedFilterOptionsDto[];

  @ApiPropertyOptional({
    description: 'Relations to populate (max 5)',
    type: [String],
    maxItems: 5,
    example: ['roles', 'profile']
  })
  @IsOptional()
  @IsArray({ message: 'Populate must be an array' })
  @ArrayMaxSize(5, { message: 'Maximum 5 relations can be populated' })
  @IsString({ each: true, message: 'Each populate field must be a string' })
  populate?: string[];

  @ApiPropertyOptional({
    description: 'Search term for full-text search',
    minLength: 3,
    maxLength: 100,
    example: 'john doe'
  })
  @IsOptional()
  @IsString({ message: 'Search term must be a string' })
  @Transform(({ value }) => value?.trim())
  search?: string;

  @ApiPropertyOptional({
    description: 'Include soft-deleted records',
    default: false,
    example: false
  })
  @IsOptional()
  @Transform(({ value }) => value === 'true' || value === true)
  includeDeleted?: boolean = false;
} 