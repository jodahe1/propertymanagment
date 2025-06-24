import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsEnum,
  IsUUID,
} from 'class-validator';
import { Type } from 'class-transformer';
import { HotelStatus } from 'src/hotel/domain/valueObjects';

export class CreateHotelDto {
  @ApiProperty({
    description: 'ID of the user who owns/manages the hotel',
    example: '123e4567-e89b-12d3-a456-426614174000',
    required: true,
  })
  @IsUUID()
  @IsNotEmpty()
  user_id!: string;

  @ApiProperty({
    description: 'Name of the hotel',
    example: 'Grand Hyatt',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  name!: string;

  @ApiProperty({
    description: 'Description of the hotel',
    example: 'A luxurious hotel in the city center.',
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    description: 'Street address of the hotel',
    example: '123 Main St',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  address!: string;

  @ApiProperty({
    description: 'City where the hotel is located',
    example: 'New York',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  city!: string;

  @ApiProperty({
    description: 'Country where the hotel is located',
    example: 'USA',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  country!: string;

  @ApiProperty({
    description: 'Zip code of the hotel location',
    example: '10001',
    required: false,
  })
  @IsOptional()
  @IsString()
  zip_code?: string;

  @ApiProperty({
    description: 'Geographical latitude',
    example: 40.7128,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  latitude?: number;

  @ApiProperty({
    description: 'Geographical longitude',
    example: -74.006,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  longitude?: number;

  @ApiProperty({
    description: 'Contact email for the hotel',
    example: 'contact@grandhyatt.com',
    required: false,
  })
  @IsOptional()
  @IsEmail()
  contact_email?: string;

  @ApiProperty({
    description: 'Contact phone number for the hotel',
    example: '+12125551234',
    required: false,
  })
  @IsOptional()
  @IsString()
  contact_phone?: string;

  @ApiProperty({
    description: 'Star rating of the hotel (e.g., 1-5)',
    example: 5,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  star_rating?: number;

  @ApiProperty({
    description: 'Status of the hotel (PENDING, ACTIVE, INACTIVE)',
    example: 'ACTIVE',
    enum: HotelStatus,
    required: true,
  })
  @IsEnum(HotelStatus)
  @IsNotEmpty()
  status!: HotelStatus;

  @ApiProperty({
    description: 'Timezone of the hotel',
    example: 'America/New_York',
    required: false,
  })
  @IsOptional()
  @IsString()
  timezone?: string;

  @ApiProperty({
    description: 'Array of image URLs for the hotel',
    example: [
      'https://example.com/hotel_img1.jpg',
      'https://example.com/hotel_img2.jpg',
    ],
    type: [String],
    required: false,
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  images?: string[];

  @ApiProperty({
    description: 'Array of amenities offered by the hotel',
    example: ['Free Wi-Fi', 'Swimming Pool', 'Gym'],
    type: [String],
    required: false,
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  amenities?: string[];

  @ApiProperty({
    description: 'Special check-in instructions',
    example: 'Check-in is at the concierge desk.',
    required: false,
  })
  @IsOptional()
  @IsString()
  check_in_instructions?: string;

  @ApiProperty({
    description: 'Legal information about the hotel',
    example: 'All guests must adhere to local laws.',
    required: false,
  })
  @IsOptional()
  @IsString()
  legal_information?: string;

  @ApiProperty({
    description: 'Whether the hotel is active',
    example: true,
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
