import { ApiProperty } from '@nestjs/swagger';

export class HotelResponseDto {
  @ApiProperty({
    description: 'The unique identifier of the hotel',
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
    description: 'ID of the user who owns/manages the hotel',
    example: 'Example user_id',
    required: true,
  })
  user_id: string;

  @ApiProperty({
    description: 'Name of the hotel',
    example: 'Example name',
    required: true,
  })
  name: string;

  @ApiProperty({
    description: 'Description of the hotel',
    example: 'Example description',
    required: false,
  })
  description?: string;

  @ApiProperty({
    description: 'Street address of the hotel',
    example: 'Example address',
    required: true,
  })
  address: string;

  @ApiProperty({
    description: 'City where the hotel is located',
    example: 'Example city',
    required: true,
  })
  city: string;

  @ApiProperty({
    description: 'Country where the hotel is located',
    example: 'Example country',
    required: true,
  })
  country: string;

  @ApiProperty({
    description: 'Zip code of the hotel location',
    example: 'Example zip_code',
    required: false,
  })
  zip_code?: string;

  @ApiProperty({
    description: 'Geographical latitude',
    example: 'Example latitude',
    required: false,
  })
  latitude?: number;

  @ApiProperty({
    description: 'Geographical longitude',
    example: 'Example longitude',
    required: false,
  })
  longitude?: number;

  @ApiProperty({
    description: 'Contact email for the hotel',
    example: 'Example contact_email',
    required: false,
  })
  contact_email?: string;

  @ApiProperty({
    description: 'Contact phone number for the hotel',
    example: 'Example contact_phone',
    required: false,
  })
  contact_phone?: string;

  @ApiProperty({
    description: 'Star rating of the hotel (e.g., 1-5)',
    example: 'Example star_rating',
    required: false,
  })
  star_rating?: number;

  @ApiProperty({
    description: 'Status of the hotel (PENDING, ACTIVE, INACTIVE)',
    example: 'Example status',
    required: true,
  })
  status: string;

  @ApiProperty({
    description: 'Timezone of the hotel',
    example: 'Example timezone',
    required: false,
  })
  timezone?: string;

  @ApiProperty({
    description: 'Array of image URLs for the hotel',
    example: 'Example images',
    required: false,
  })
  images?: string[];

  @ApiProperty({
    description: 'Array of amenities offered by the hotel',
    example: 'Example amenities',
    required: false,
  })
  amenities?: string[];

  @ApiProperty({
    description: 'Special check-in instructions',
    example: 'Example check_in_instructions',
    required: false,
  })
  check_in_instructions?: string;

  @ApiProperty({
    description: 'Legal information about the hotel',
    example: 'Example legal_information',
    required: false,
  })
  legal_information?: string;
}
