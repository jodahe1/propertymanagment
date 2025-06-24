import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';


export class CreateRoomTypeDto {
  @ApiProperty({
    description: 'ID of the hotel this room type belongs to',
    example: 'Example hotel_id',
    required: true,
  })
  @IsNotEmpty()
  hotel_id: string;

  @ApiProperty({
    description: 'Name of the room type',
    example: 'Example name',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Description of the room type',
    example: 'Example description',
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    description: 'Maximum number of guests allowed',
    example: 'Example max_guests',
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  max_guests: number;

  @ApiProperty({
    description: 'Maximum number of adults allowed',
    example: 'Example max_adults',
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  max_adults: number;

  @ApiProperty({
    description: 'Maximum number of children allowed',
    example: 'Example max_children',
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  max_children: number;

  @ApiProperty({
    description: 'Type of bed(s) in the room (SINGLE, DOUBLE, QUEEN, KING, MIXED)',
    example: 'Example bed_type',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  bed_type: string;

  @ApiProperty({
    description: 'Array of amenities available in this room type',
    example: 'Example amenities',
    required: false,
  })
  @IsOptional()
  @IsArray()
  amenities?: string[];

  @ApiProperty({
    description: 'Base price per night for this room type',
    example: 'Example base_price',
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  base_price: number;

  @ApiProperty({
    description: 'Size of the room in square meters',
    example: 'Example size_sqm',
    required: false,
  })
  @IsOptional()
  @IsNumber()
  size_sqm?: number;

  @ApiProperty({
    description: 'Number of rooms of this type available',
    example: 'Example quantity',
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  quantity: number;

  @ApiProperty({
    description: 'Capacity for extra beds in the room',
    example: 'Example extra_bed_capacity',
    required: false,
  })
  @IsOptional()
  @IsNumber()
  extra_bed_capacity?: number;

  @ApiProperty({
    description: 'Whether the roomType is active',
    example: true,
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
