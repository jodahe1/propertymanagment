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
    description: 'ID of the hotel this room belongs to',
    example: 'Example hotel_id',
    required: true,
  })
  hotel_id: string;

  @ApiProperty({
    description: 'ID of the room type this room belongs to',
    example: 'Example room_type_id',
    required: true,
  })
  room_type_id: string;

  @ApiProperty({
    description: 'Unique identifier for the room within the hotel',
    example: 'Example room_number',
    required: true,
  })
  room_number: string;

  @ApiProperty({
    description: 'Floor number where the room is located',
    example: 'Example floor_number',
    required: false,
  })
  floor_number?: number;

  @ApiProperty({
    description: 'Current availability status of the room (AVAILABLE, BOOKED, MAINTENANCE, CLEANING)',
    example: 'Example availability_status',
    required: true,
  })
  availability_status: string;

  @ApiProperty({
    description: 'Current price of the room, potentially overridden from base price',
    example: 'Example current_price',
    required: true,
  })
  current_price: number;

  @ApiProperty({
    description: 'Any special notes about the room',
    example: 'Example notes',
    required: false,
  })
  notes?: string;
}
