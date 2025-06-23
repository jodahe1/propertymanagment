import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDate, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';
import { Type } from 'class-transformer';

export class CreatePaymentDto {
  @ApiProperty({
    description: 'Foreign key to Booking',
    example: 'Example bookingId',
    required: true,
  })
  @IsNotEmpty()
  @IsUUID()
  bookingId: string;

  @ApiProperty({
    description: 'Payment amount',
    example: 'Example amount',
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @ApiProperty({
    description: 'Currency (e.g., 'USD')',
    example: 'Example currency',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  currency: string;

  @ApiProperty({
    description: 'Payment method (e.g., CARD, CASH, BANK_TRANSFER, VIRTUAL_CARD) - will be an enum later',
    example: 'Example paymentMethod',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  paymentMethod: string;

  @ApiProperty({
    description: 'Payment status (e.g., SUCCESS, FAILED, PENDING) - will be an enum later',
    example: 'Example status',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  status: string;

  @ApiProperty({
    description: 'Reference ID for the transaction',
    example: 'Example transactionReference',
    required: false,
  })
  @IsOptional()
  @IsString()
  transactionReference?: string;

  @ApiProperty({
    description: 'Timestamp when the payment was made',
    example: 'Example paidAt',
    required: true,
  })
  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  paidAt: Date;

  @ApiProperty({
    description: 'Whether the payment is active',
    example: true,
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
