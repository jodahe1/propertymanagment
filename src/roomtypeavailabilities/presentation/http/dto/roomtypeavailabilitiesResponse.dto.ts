import { ApiProperty } from '@nestjs/swagger';
import { BlockedReason } from 'src/roomtypeavailabilities/domain/valueObjects/blocked-reason.enum';

export class RoomtypeavailabilitiesResponseDto {
  @ApiProperty({
    description: 'The unique identifier of the roomtypeavailabilities',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  id!: string;

  @ApiProperty({
    description: 'Whether the entity is active',
    example: true,
    required: true,
  })
  isActive: boolean;

  @ApiProperty({
    description: 'When the entity was created',
    example: '2023-01-01T00:00:00.000Z',
    required: false,
  })
  createdAt?: Date;

  @ApiProperty({
    description: 'When the entity was last updated',
    example: '2023-01-01T00:00:00.000Z',
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
    description: 'The ID of the room type this availability applies to',
    example: 'a1b2c3d4-e5f6-7890-1234-567890abcdef',
    required: true,
  })
  roomTypeId: string;

  @ApiProperty({
    description: 'The specific date for this availability entry (YYYY-MM-DD)',
    example: '2025-12-25',
    required: true,
  })
  date: string;

  @ApiProperty({
    description:
      'The number of rooms of this type available for booking on this date',
    example: 5,
    required: true,
  })
  availableQuantity: number;

  @ApiProperty({
    description:
      "A multiplier or additive amount that adjusts the room type's base price for this date (e.g., 1.2 for +20%, 0.8 for -20%)",
    example: 1.1,
    required: false,
  })
  priceModifier?: number;

  @ApiProperty({
    description:
      'Minimum nights required for a booking starting on this date for this room type',
    example: 2,
    required: false,
  })
  minStayNights?: number;

  @ApiProperty({
    description:
      'Maximum nights allowed for a booking starting on this date for this room type',
    example: 7,
    required: false,
  })
  maxStayNights?: number;

  @ApiProperty({
    description: 'Reason if the entire room type is blocked for this date',
    example: 'MAINTENANCE',
    enum: BlockedReason,
    required: false,
  })
  blockedReason?: BlockedReason;
}
