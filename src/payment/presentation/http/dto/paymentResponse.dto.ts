import { ApiProperty } from '@nestjs/swagger';

export class PaymentResponseDto {
  @ApiProperty({
    description: 'The unique identifier of the payment',
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
    description: 'Foreign key to Booking',
    example: 'Example bookingId',
    required: true,
  })
  bookingId: string;

  @ApiProperty({
    description: 'Payment amount',
    example: 'Example amount',
    required: true,
  })
  amount: number;

  @ApiProperty({
    description: 'Currency (e.g., 'USD')',
    example: 'Example currency',
    required: true,
  })
  currency: string;

  @ApiProperty({
    description: 'Payment method (e.g., CARD, CASH, BANK_TRANSFER, VIRTUAL_CARD) - will be an enum later',
    example: 'Example paymentMethod',
    required: true,
  })
  paymentMethod: string;

  @ApiProperty({
    description: 'Payment status (e.g., SUCCESS, FAILED, PENDING) - will be an enum later',
    example: 'Example status',
    required: true,
  })
  status: string;

  @ApiProperty({
    description: 'Reference ID for the transaction',
    example: 'Example transactionReference',
    required: false,
  })
  transactionReference?: string;

  @ApiProperty({
    description: 'Timestamp when the payment was made',
    example: 'Example paidAt',
    required: true,
  })
  paidAt: Date;
}
