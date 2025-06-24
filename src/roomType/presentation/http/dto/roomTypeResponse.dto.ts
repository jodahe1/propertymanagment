import { ApiProperty } from '@nestjs/swagger';

export class RoomTypeResponseDto {
  @ApiProperty({
    description: 'The unique identifier of the roomType',
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
    description: 'ID of the hotel this room type belongs to',
    example: 'Example hotel_id',
    required: true,
  })
  hotel_id: string;

  @ApiProperty({
    description: 'Name of the room type',
    example: 'Example name',
    required: true,
  })
  name: string;

  @ApiProperty({
    description: 'Description of the room type',
    example: 'Example description',
    required: false,
  })
  description?: string;

  @ApiProperty({
    description: 'Maximum number of guests allowed',
    example: 'Example max_guests',
    required: true,
  })
  max_guests: number;

  @ApiProperty({
    description: 'Maximum number of adults allowed',
    example: 'Example max_adults',
    required: true,
  })
  max_adults: number;

  @ApiProperty({
    description: 'Maximum number of children allowed',
    example: 'Example max_children',
    required: true,
  })
  max_children: number;

  @ApiProperty({
    description: 'Type of bed(s) in the room (SINGLE, DOUBLE, QUEEN, KING, MIXED)',
    example: 'Example bed_type',
    required: true,
  })
  bed_type: string;

  @ApiProperty({
    description: 'Array of amenities available in this room type',
    example: 'Example amenities',
    required: false,
  })
  amenities?: string[];

  @ApiProperty({
    description: 'Base price per night for this room type',
    example: 'Example base_price',
    required: true,
  })
  base_price: number;

  @ApiProperty({
    description: 'Size of the room in square meters',
    example: 'Example size_sqm',
    required: false,
  })
  size_sqm?: number;

  @ApiProperty({
    description: 'Number of rooms of this type available',
    example: 'Example quantity',
    required: true,
  })
  quantity: number;

  @ApiProperty({
    description: 'Capacity for extra beds in the room',
    example: 'Example extra_bed_capacity',
    required: false,
  })
  extra_bed_capacity?: number;
}
