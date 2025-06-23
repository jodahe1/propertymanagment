import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDate, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateBookingDto {
  @ApiProperty({
    description: 'Foreign key to Hotel',
    example: 'Example hotelId',
    required: true,
  })
  @IsNotEmpty()
  @IsUUID()
  hotelId: string;

  @ApiProperty({
    description: 'Foreign key to Guest',
    example: 'Example guestId',
    required: true,
  })
  @IsNotEmpty()
  @IsUUID()
  guestId: string;

  @ApiProperty({
    description: 'Foreign key to Room',
    example: 'Example roomId',
    required: true,
  })
  @IsNotEmpty()
  @IsUUID()
  roomId: string;

  @ApiProperty({
    description: 'Check-in date',
    example: 'Example checkInDate',
    required: true,
  })
  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  checkInDate: Date;

  @ApiProperty({
    description: 'Check-out date',
    example: 'Example checkOutDate',
    required: true,
  })
  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  checkOutDate: Date;

  @ApiProperty({
    description: 'Number of guests',
    example: 'Example numGuests',
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  numGuests: number;

  @ApiProperty({
    description: 'Total price of the booking',
    example: 'Example totalPrice',
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  totalPrice: number;

  @ApiProperty({
    description: 'Currency (e.g., 'USD')',
    example: 'Example currency',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  currency: string;

  @ApiProperty({
    description: 'Booking status (e.g., PENDING, CONFIRMED, CHECKED_IN, CHECKED_OUT, CANCELLED, NO_SHOW) - will be an enum later',
    example: 'Example status',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  status: string;

  @ApiProperty({
    description: 'Any special notes about the booking',
    example: 'Example notes',
    required: false,
  })
  @IsOptional()
  @IsString()
  notes?: string;

  @ApiProperty({
    description: 'Whether the booking is active',
    example: true,
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
