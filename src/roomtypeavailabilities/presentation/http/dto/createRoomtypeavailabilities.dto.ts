import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsEnum,
} from 'class-validator';
import { BlockedReason } from 'src/roomtypeavailabilities/domain/valueObjects/blocked-reason.enum';

export class CreateRoomtypeavailabilitiesDto {
  @ApiProperty({
    description: 'The ID of the room type this availability applies to',
    example: 'a1b2c3d4-e5f6-7890-1234-567890abcdef',
    required: true,
  })
  @IsNotEmpty()
  roomTypeId: string;

  @ApiProperty({
    description: 'The specific date for this availability entry (YYYY-MM-DD)',
    example: '2025-12-25',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  date: string;

  @ApiProperty({
    description:
      'The number of rooms of this type available for booking on this date',
    example: 5,
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  availableQuantity: number;

  @ApiProperty({
    description:
      "A multiplier or additive amount that adjusts the room type's base price for this date (e.g., 1.2 for +20%, 0.8 for -20%)",
    example: 1.1,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  priceModifier?: number;

  @ApiProperty({
    description:
      'Minimum nights required for a booking starting on this date for this room type',
    example: 2,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  minStayNights?: number;

  @ApiProperty({
    description:
      'Maximum nights allowed for a booking starting on this date for this room type',
    example: 7,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  maxStayNights?: number;

  @ApiProperty({
    description: 'Reason if the entire room type is blocked for this date',
    example: 'MAINTENANCE',
    enum: BlockedReason,
    required: false,
  })
  @IsOptional()
  @IsEnum(BlockedReason)
  blockedReason?: BlockedReason;

  @ApiProperty({
    description: 'Whether the roomtypeavailabilities is active',
    example: true,
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
