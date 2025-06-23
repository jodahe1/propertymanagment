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
    description: 'Foreign key to User (Hotel Owner/Admin)',
    example: 'Example userId',
    required: true,
  })
  userId: string;

  @ApiProperty({
    description: 'Hotel name',
    example: 'Example name',
    required: true,
  })
  name: string;

  @ApiProperty({
    description: 'Detailed description of the hotel',
    example: 'Example description',
    required: false,
  })
  description?: string;

  @ApiProperty({
    description: 'Hotel street address',
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
    description: 'Postal or ZIP code',
    example: 'Example zipCode',
    required: false,
  })
  zipCode?: string;

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
    description: 'Hotel's primary contact email',
    example: 'Example contactEmail',
    required: true,
  })
  contactEmail: string;

  @ApiProperty({
    description: 'Hotel's primary contact phone number',
    example: 'Example contactPhone',
    required: true,
  })
  contactPhone: string;

  @ApiProperty({
    description: 'Hotel's star rating (1-5)',
    example: 'Example starRating',
    required: false,
  })
  starRating?: number;

  @ApiProperty({
    description: 'Operational status of the hotel (PENDING, ACTIVE, INACTIVE)',
    example: 'Example status',
    required: true,
  })
  status: string;

  @ApiProperty({
    description: 'Timezone of the hotel (e.g., 'America/New_York')',
    example: 'Example timezone',
    required: false,
  })
  timezone?: string;

  @ApiProperty({
    description: 'Array of URLs to hotel images',
    example: 'Example images',
    required: false,
  })
  images?: string[];
}
