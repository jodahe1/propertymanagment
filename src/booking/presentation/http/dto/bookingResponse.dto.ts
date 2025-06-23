import { ApiProperty } from '@nestjs/swagger';

export class BookingResponseDto {
  @ApiProperty({
    description: 'The unique identifier of the booking',
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
    description: 'Foreign key to Guest',
    example: 'Example guestId',
    required: true,
  })
  guestId: string;

  @ApiProperty({
    description: 'Foreign key to Room',
    example: 'Example roomId',
    required: true,
  })
  roomId: string;

  @ApiProperty({
    description: 'Check-in date',
    example: 'Example checkInDate',
    required: true,
  })
  checkInDate: Date;

  @ApiProperty({
    description: 'Check-out date',
    example: 'Example checkOutDate',
    required: true,
  })
  checkOutDate: Date;

  @ApiProperty({
    description: 'Number of guests',
    example: 'Example numGuests',
    required: true,
  })
  numGuests: number;

  @ApiProperty({
    description: 'Total price of the booking',
    example: 'Example totalPrice',
    required: true,
  })
  totalPrice: number;

  @ApiProperty({
    description: 'Currency (e.g., 'USD')',
    example: 'Example currency',
    required: true,
  })
  currency: string;

  @ApiProperty({
    description: 'Booking status (e.g., PENDING, CONFIRMED, CHECKED_IN, CHECKED_OUT, CANCELLED, NO_SHOW) - will be an enum later',
    example: 'Example status',
    required: true,
  })
  status: string;

  @ApiProperty({
    description: 'Any special notes about the booking',
    example: 'Example notes',
    required: false,
  })
  notes?: string;
}
