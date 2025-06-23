import { ApiProperty } from '@nestjs/swagger';

export class InvoiceResponseDto {
  @ApiProperty({
    description: 'The unique identifier of the invoice',
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
    description: 'Foreign key to Booking',
    example: 'Example bookingId',
    required: true,
  })
  bookingId: string;

  @ApiProperty({
    description: 'Unique invoice number',
    example: 'Example invoiceNumber',
    required: true,
  })
  invoiceNumber: string;

  @ApiProperty({
    description: 'Total amount due on the invoice',
    example: 'Example amountDue',
    required: true,
  })
  amountDue: number;

  @ApiProperty({
    description: 'JSON string representing tax breakdown (e.g., {"VAT": 0.10, "City_Tax": 0.02}) - will be an object later',
    example: 'Example taxes',
    required: false,
  })
  taxes?: string;

  @ApiProperty({
    description: 'Date when the invoice was issued',
    example: 'Example issuedAt',
    required: true,
  })
  issuedAt: Date;

  @ApiProperty({
    description: 'Date by which the invoice is due',
    example: 'Example dueDate',
    required: true,
  })
  dueDate: Date;

  @ApiProperty({
    description: 'Invoice status (e.g., PAID, UNPAID) - will be an enum later',
    example: 'Example status',
    required: true,
  })
  status: string;
}
