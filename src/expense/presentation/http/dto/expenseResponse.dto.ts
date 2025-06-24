import { ApiProperty } from '@nestjs/swagger';

export class ExpenseResponseDto {
  @ApiProperty({
    description: 'The unique identifier of the expense',
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
    description: 'Category of the expense (e.g., SUPPLIES, UTILITIES, MAINTENANCE, SALARIES, MARKETING, OTHER) - will be an enum later',
    example: 'Example category',
    required: true,
  })
  category: string;

  @ApiProperty({
    description: 'Amount of the expense',
    example: 'Example amount',
    required: true,
  })
  amount: number;

  @ApiProperty({
    description: 'Currency of the expense (e.g., 'USD')',
    example: 'Example currency',
    required: true,
  })
  currency: string;

  @ApiProperty({
    description: 'Description of the expense',
    example: 'Example description',
    required: false,
  })
  description?: string;

  @ApiProperty({
    description: 'Date when the expense occurred',
    example: 'Example expenseDate',
    required: true,
  })
  expenseDate: Date;

  @ApiProperty({
    description: 'URL to the expense receipt',
    example: 'Example receiptUrl',
    required: false,
  })
  receiptUrl?: string;
}
