import { ApiProperty } from '@nestjs/swagger';

export class RoomResponseDto {
  @ApiProperty({
    description: 'The unique identifier of the room',
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
    description: 'Foreign key to RoomType',
    example: 'Example roomTypeId',
    required: true,
  })
  roomTypeId: string;

  @ApiProperty({
    description: 'Unique room number (e.g., '101A')',
    example: 'Example roomNumber',
    required: true,
  })
  roomNumber: string;

  @ApiProperty({
    description: 'Floor number where the room is located',
    example: 'Example floor',
    required: true,
  })
  floor: number;

  @ApiProperty({
    description: 'Current status of the room (e.g., AVAILABLE, OCCUPIED, MAINTENANCE, CLEANING) - will be an enum later',
    example: 'Example status',
    required: true,
  })
  status: string;

  @ApiProperty({
    description: 'Timestamp of the last cleaning',
    example: 'Example lastCleanedAt',
    required: false,
  })
  lastCleanedAt?: Date;

  @ApiProperty({
    description: 'Any special notes about the room',
    example: 'Example notes',
    required: false,
  })
  notes?: string;
}
