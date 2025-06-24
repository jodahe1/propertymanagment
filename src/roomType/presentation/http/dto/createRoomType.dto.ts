import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsEnum,
  IsUUID,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';
import { BedType } from 'src/roomType/domain/valueObjects';

export class CreateRoomTypeDto {
  @ApiProperty({
    description: 'ID of the hotel this room type belongs to',
    example: '123e4567-e89b-12d3-a456-426614174000',
    required: true,
  })
  @IsUUID()
  @IsNotEmpty()
  hotel_id!: string;

  @ApiProperty({
    description: 'Name of the room type',
    example: 'Deluxe King Room',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  name!: string;

  @ApiProperty({
    description: 'Description of the room type',
    example: 'Spacious room with a king-size bed and city views.',
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    description: 'Maximum number of guests allowed',
    example: 3,
    required: true,
  })
  @IsNumber()
  @IsNotEmpty()
  @Min(1)
  @Type(() => Number)
  max_guests!: number;

  @ApiProperty({
    description: 'Maximum number of adults allowed',
    example: 2,
    required: true,
  })
  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  @Type(() => Number)
  max_adults!: number;

  @ApiProperty({
    description: 'Maximum number of children allowed',
    example: 1,
    required: true,
  })
  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  @Type(() => Number)
  max_children!: number;

  @ApiProperty({
    description:
      'Type of bed(s) in the room (SINGLE, DOUBLE, QUEEN, KING, MIXED)',
    example: 'KING',
    enum: BedType,
    required: true,
  })
  @IsEnum(BedType)
  @IsNotEmpty()
  bed_type!: BedType;

  @ApiProperty({
    description: 'Array of amenities available in this room type',
    example: ['Free Wi-Fi', 'Flat-screen TV', 'Mini-fridge'],
    type: [String],
    required: false,
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  amenities?: string[];

  @ApiProperty({
    description: 'Base price per night for this room type',
    example: 150.0,
    required: true,
  })
  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  @Type(() => Number)
  base_price!: number;

  @ApiProperty({
    description: 'Size of the room in square meters',
    example: 30.5,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  size_sqm?: number;

  @ApiProperty({
    description: 'Number of rooms of this type available',
    example: 10,
    required: true,
  })
  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  @Type(() => Number)
  quantity!: number;

  @ApiProperty({
    description: 'Capacity for extra beds in the room',
    example: 1,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  extra_bed_capacity?: number;
}
