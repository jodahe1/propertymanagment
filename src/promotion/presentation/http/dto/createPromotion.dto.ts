import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDate, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';
import { Type } from 'class-transformer';

export class CreatePromotionDto {
  @ApiProperty({
    description: 'Foreign key to Hotel',
    example: 'Example hotelId',
    required: true,
  })
  @IsNotEmpty()
  @IsUUID()
  hotelId: string;

  @ApiProperty({
    description: 'Unique promotion code (e.g., 'SUMMER20')',
    example: 'Example code',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  code: string;

  @ApiProperty({
    description: 'Type of discount (e.g., PERCENTAGE, FIXED) - will be an enum later',
    example: 'Example discountType',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  discountType: string;

  @ApiProperty({
    description: 'Discount value (e.g., 0.15 for 15% or 25 for $25 fixed)',
    example: 'Example value',
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  value: number;

  @ApiProperty({
    description: 'Date from which the promotion is valid',
    example: 'Example validFrom',
    required: true,
  })
  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  validFrom: Date;

  @ApiProperty({
    description: 'Date until which the promotion is valid',
    example: 'Example validTo',
    required: true,
  })
  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  validTo: Date;

  @ApiProperty({
    description: 'Minimum number of nights for the promotion to apply',
    example: 'Example minStay',
    required: false,
  })
  @IsOptional()
  @IsNumber()
  minStay?: number;

  @ApiProperty({
    description: 'Whether the promotion is active',
    example: true,
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
