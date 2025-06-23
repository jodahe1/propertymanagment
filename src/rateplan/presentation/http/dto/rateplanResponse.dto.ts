import { ApiProperty } from '@nestjs/swagger';

export class RateplanResponseDto {
  @ApiProperty({
    description: 'The unique identifier of the rateplan',
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
    description: 'Foreign key to RoomType',
    example: 'Example roomTypeId',
    required: true,
  })
  roomTypeId: string;

  @ApiProperty({
    description: 'Name of the rate plan (e.g., 'Standard Rate', 'Non-Refundable Rate')',
    example: 'Example name',
    required: true,
  })
  name: string;

  @ApiProperty({
    description: 'Detailed description of the rate plan',
    example: 'Example description',
    required: false,
  })
  description?: string;

  @ApiProperty({
    description: 'Modifier for the base price (e.g., 0.9 for 10% discount, 1.1 for 10% premium)',
    example: 'Example basePriceModifier',
    required: true,
  })
  basePriceModifier: number;

  @ApiProperty({
    description: 'Minimum number of nights required for this rate plan',
    example: 'Example minNights',
    required: false,
  })
  minNights?: number;

  @ApiProperty({
    description: 'Maximum number of nights allowed for this rate plan',
    example: 'Example maxNights',
    required: false,
  })
  maxNights?: number;

  @ApiProperty({
    description: 'Date from which this rate plan is valid',
    example: 'Example validFrom',
    required: false,
  })
  validFrom?: Date;

  @ApiProperty({
    description: 'Date until which this rate plan is valid',
    example: 'Example validTo',
    required: false,
  })
  validTo?: Date;

  @ApiProperty({
    description: 'Status of the rate plan (e.g., ACTIVE, INACTIVE) - will be an enum later',
    example: 'Example status',
    required: true,
  })
  status: string;
}
