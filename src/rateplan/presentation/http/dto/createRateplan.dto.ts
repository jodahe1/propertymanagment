import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDate, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateRateplanDto {
  @ApiProperty({
    description: 'Foreign key to Hotel',
    example: 'Example hotelId',
    required: true,
  })
  @IsNotEmpty()
  @IsUUID()
  hotelId: string;

  @ApiProperty({
    description: 'Foreign key to RoomType',
    example: 'Example roomTypeId',
    required: true,
  })
  @IsNotEmpty()
  @IsUUID()
  roomTypeId: string;

  @ApiProperty({
    description: 'Name of the rate plan (e.g., 'Standard Rate', 'Non-Refundable Rate')',
    example: 'Example name',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Detailed description of the rate plan',
    example: 'Example description',
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    description: 'Modifier for the base price (e.g., 0.9 for 10% discount, 1.1 for 10% premium)',
    example: 'Example basePriceModifier',
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  basePriceModifier: number;

  @ApiProperty({
    description: 'Minimum number of nights required for this rate plan',
    example: 'Example minNights',
    required: false,
  })
  @IsOptional()
  @IsNumber()
  minNights?: number;

  @ApiProperty({
    description: 'Maximum number of nights allowed for this rate plan',
    example: 'Example maxNights',
    required: false,
  })
  @IsOptional()
  @IsNumber()
  maxNights?: number;

  @ApiProperty({
    description: 'Date from which this rate plan is valid',
    example: 'Example validFrom',
    required: false,
  })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  validFrom?: Date;

  @ApiProperty({
    description: 'Date until which this rate plan is valid',
    example: 'Example validTo',
    required: false,
  })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  validTo?: Date;

  @ApiProperty({
    description: 'Status of the rate plan (e.g., ACTIVE, INACTIVE) - will be an enum later',
    example: 'Example status',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  status: string;

  @ApiProperty({
    description: 'Whether the rateplan is active',
    example: true,
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
