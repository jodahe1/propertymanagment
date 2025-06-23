import { ApiProperty } from '@nestjs/swagger';

export class RoomtypeResponseDto {
  @ApiProperty({
    description: 'The unique identifier of the roomtype',
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
    description: 'Name of the room type (e.g., Deluxe Suite)',
    example: 'Example name',
    required: true,
  })
  name: string;

  @ApiProperty({
    description: 'Detailed description of the room type',
    example: 'Example description',
    required: false,
  })
  description?: string;

  @ApiProperty({
    description: 'Maximum number of guests for this room type',
    example: 'Example maxGuests',
    required: true,
  })
  maxGuests: number;

  @ApiProperty({
    description: 'Type of bed (e.g., SINGLE, DOUBLE, QUEEN, KING, MIXED) - will be an enum later',
    example: 'Example bedType',
    required: true,
  })
  bedType: string;

  @ApiProperty({
    description: 'Array of amenities available in this room type (e.g., WiFi, AC, TV) - will be string[] later',
    example: 'Example amenities',
    required: false,
  })
  amenities?: string[];

  @ApiProperty({
    description: 'Base price per night for this room type',
    example: 'Example basePrice',
    required: true,
  })
  basePrice: number;

  @ApiProperty({
    description: 'Size of the room type in square feet',
    example: 'Example sizeSqft',
    required: false,
  })
  sizeSqft?: number;

  @ApiProperty({
    description: 'Array of URLs to images of this room type - will be string[] later',
    example: 'Example images',
    required: false,
  })
  images?: string[];
}
