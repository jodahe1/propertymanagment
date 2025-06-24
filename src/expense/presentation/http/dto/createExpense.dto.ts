import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDate, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateExpenseDto {
  @ApiProperty({
    description: 'Foreign key to Hotel',
    example: 'Example hotelId',
    required: true,
  })
  @IsNotEmpty()
  @IsUUID()
  hotelId: string;

  @ApiProperty({
    description: 'Category of the expense (e.g., SUPPLIES, UTILITIES, MAINTENANCE, SALARIES, MARKETING, OTHER) - will be an enum later',
    example: 'Example category',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  category: string;

  @ApiProperty({
    description: 'Amount of the expense',
    example: 'Example amount',
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @ApiProperty({
    description: 'Currency of the expense (e.g., 'USD')',
    example: 'Example currency',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  currency: string;

  @ApiProperty({
    description: 'Description of the expense',
    example: 'Example description',
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    description: 'Date when the expense occurred',
    example: 'Example expenseDate',
    required: true,
  })
  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  expenseDate: Date;

  @ApiProperty({
    description: 'URL to the expense receipt',
    example: 'Example receiptUrl',
    required: false,
  })
  @IsOptional()
  @IsString()
  receiptUrl?: string;

  @ApiProperty({
    description: 'Whether the expense is active',
    example: true,
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
