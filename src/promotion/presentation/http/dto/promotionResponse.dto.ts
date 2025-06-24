import { ApiProperty } from '@nestjs/swagger';

export class PromotionResponseDto {
  @ApiProperty({
    description: 'The unique identifier of the promotion',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  id!: string;

  @ApiProperty({
    description: 'Whether the entity is active',
    example: 'true',
    required: true,
  })
  isActive: boolean;

  @ApiProperty({
    description: 'When the entity was created',
    example: '2023-01-01T00:00:00Z',
    required: false,
  })
  createdAt?: Date;

  @ApiProperty({
    description: 'When the entity was last updated',
    example: '2023-01-01T00:00:00Z',
    required: false,
  })
  updatedAt?: Date;

  @ApiProperty({
    description: 'Who created the entity',
    example: 'user123',
    required: false,
  })
  createdBy?: string;

  @ApiProperty({
    description: 'Who last updated the entity',
    example: 'user123',
    required: false,
  })
  updatedBy?: string;

  @ApiProperty({
    description: 'Foreign key to Hotel',
    example: 'Example hotelId',
    required: true,
  })
  hotelId: string;

  @ApiProperty({
    description: 'Unique promotion code (e.g., 'SUMMER20')',
    example: 'Example code',
    required: true,
  })
  code: string;

  @ApiProperty({
    description: 'Type of discount (e.g., PERCENTAGE, FIXED) - will be an enum later',
    example: 'Example discountType',
    required: true,
  })
  discountType: string;

  @ApiProperty({
    description: 'Discount value (e.g., 0.15 for 15% or 25 for $25 fixed)',
    example: 'Example value',
    required: true,
  })
  value: number;

  @ApiProperty({
    description: 'Date from which the promotion is valid',
    example: 'Example validFrom',
    required: true,
  })
  validFrom: Date;

  @ApiProperty({
    description: 'Date until which the promotion is valid',
    example: 'Example validTo',
    required: true,
  })
  validTo: Date;

  @ApiProperty({
    description: 'Minimum number of nights for the promotion to apply',
    example: 'Example minStay',
    required: false,
  })
  minStay?: number;
}
