import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';


export class CreateRoomtypeDto {
  @ApiProperty({
    description: 'Foreign key to Hotel',
    example: 'Example hotelId',
    required: true,
  })
  @IsNotEmpty()
  @IsUUID()
  hotelId: string;

  @ApiProperty({
    description: 'Name of the room type (e.g., Deluxe Suite)',
    example: 'Example name',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Detailed description of the room type',
    example: 'Example description',
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    description: 'Maximum number of guests for this room type',
    example: 'Example maxGuests',
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  maxGuests: number;

  @ApiProperty({
    description: 'Type of bed (e.g., SINGLE, DOUBLE, QUEEN, KING, MIXED) - will be an enum later',
    example: 'Example bedType',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  bedType: string;

  @ApiProperty({
    description: 'Array of amenities available in this room type (e.g., WiFi, AC, TV) - will be string[] later',
    example: 'Example amenities',
    required: false,
  })
  @IsOptional()
  @IsArray()
  amenities?: string[];

  @ApiProperty({
    description: 'Base price per night for this room type',
    example: 'Example basePrice',
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  basePrice: number;

  @ApiProperty({
    description: 'Size of the room type in square feet',
    example: 'Example sizeSqft',
    required: false,
  })
  @IsOptional()
  @IsNumber()
  sizeSqft?: number;

  @ApiProperty({
    description: 'Array of URLs to images of this room type - will be string[] later',
    example: 'Example images',
    required: false,
  })
  @IsOptional()
  @IsArray()
  images?: string[];

  @ApiProperty({
    description: 'Whether the roomtype is active',
    example: true,
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
