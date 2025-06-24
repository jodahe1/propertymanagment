import { ApiProperty } from '@nestjs/swagger';

export class HousekeepingResponseDto {
  @ApiProperty({
    description: 'The unique identifier of the housekeeping',
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
    description: 'Foreign key to Room',
    example: 'Example roomId',
    required: true,
  })
  roomId: string;

  @ApiProperty({
    description: 'Foreign key to Staff',
    example: 'Example staffId',
    required: true,
  })
  staffId: string;

  @ApiProperty({
    description: 'Housekeeping status (e.g., PENDING, IN_PROGRESS, COMPLETED) - will be an enum later',
    example: 'Example status',
    required: true,
  })
  status: string;

  @ApiProperty({
    description: 'Any special notes for housekeeping',
    example: 'Example notes',
    required: false,
  })
  notes?: string;

  @ApiProperty({
    description: 'Timestamp when the housekeeping task was completed',
    example: 'Example completedAt',
    required: false,
  })
  completedAt?: Date;
}
