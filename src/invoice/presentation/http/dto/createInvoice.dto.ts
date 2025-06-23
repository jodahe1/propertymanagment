import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDate, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateInvoiceDto {
  @ApiProperty({
    description: 'Foreign key to Hotel',
    example: 'Example hotelId',
    required: true,
  })
  @IsNotEmpty()
  @IsUUID()
  hotelId: string;

  @ApiProperty({
    description: 'Foreign key to Booking',
    example: 'Example bookingId',
    required: true,
  })
  @IsNotEmpty()
  @IsUUID()
  bookingId: string;

  @ApiProperty({
    description: 'Unique invoice number',
    example: 'Example invoiceNumber',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  invoiceNumber: string;

  @ApiProperty({
    description: 'Total amount due on the invoice',
    example: 'Example amountDue',
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  amountDue: number;

  @ApiProperty({
    description: 'JSON string representing tax breakdown (e.g., {"VAT": 0.10, "City_Tax": 0.02}) - will be an object later',
    example: 'Example taxes',
    required: false,
  })
  @IsOptional()
  @IsString()
  taxes?: string;

  @ApiProperty({
    description: 'Date when the invoice was issued',
    example: 'Example issuedAt',
    required: true,
  })
  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  issuedAt: Date;

  @ApiProperty({
    description: 'Date by which the invoice is due',
    example: 'Example dueDate',
    required: true,
  })
  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  dueDate: Date;

  @ApiProperty({
    description: 'Invoice status (e.g., PAID, UNPAID) - will be an enum later',
    example: 'Example status',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  status: string;

  @ApiProperty({
    description: 'Whether the invoice is active',
    example: true,
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
