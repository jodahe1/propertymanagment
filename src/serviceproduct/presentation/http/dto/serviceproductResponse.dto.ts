import { ApiProperty } from '@nestjs/swagger';

export class ServiceproductResponseDto {
  @ApiProperty({
    description: 'The unique identifier of the serviceproduct',
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
    description: 'Name of the service or product (e.g., 'Laundry Service', 'Airport Shuttle')',
    example: 'Example name',
    required: true,
  })
  name: string;

  @ApiProperty({
    description: 'Description of the service or product',
    example: 'Example description',
    required: false,
  })
  description?: string;

  @ApiProperty({
    description: 'Price of the service or product',
    example: 'Example price',
    required: true,
  })
  price: number;

  @ApiProperty({
    description: 'Currency of the price (e.g., 'USD')',
    example: 'Example currency',
    required: true,
  })
  currency: string;

  @ApiProperty({
    description: 'Availability status (e.g., AVAILABLE, UNAVAILABLE) - will be an enum later',
    example: 'Example status',
    required: true,
  })
  status: string;
}
