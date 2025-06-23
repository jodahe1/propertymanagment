import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsBoolean, IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';


export class CreateHotelDto {
  @ApiProperty({
    description: 'Foreign key to User (Hotel Owner/Admin)',
    example: 'Example userId',
    required: true,
  })
  @IsNotEmpty()
  @IsUUID()
  userId: string;

  @ApiProperty({
    description: 'Hotel name',
    example: 'Example name',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Detailed description of the hotel',
    example: 'Example description',
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    description: 'Hotel street address',
    example: 'Example address',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  address: string;

  @ApiProperty({
    description: 'City where the hotel is located',
    example: 'Example city',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  city: string;

  @ApiProperty({
    description: 'Country where the hotel is located',
    example: 'Example country',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  country: string;

  @ApiProperty({
    description: 'Postal or ZIP code',
    example: 'Example zipCode',
    required: false,
  })
  @IsOptional()
  @IsString()
  zipCode?: string;

  @ApiProperty({
    description: 'Geographical latitude',
    example: 'Example latitude',
    required: false,
  })
  @IsOptional()
  @IsNumber()
  latitude?: number;

  @ApiProperty({
    description: 'Geographical longitude',
    example: 'Example longitude',
    required: false,
  })
  @IsOptional()
  @IsNumber()
  longitude?: number;

  @ApiProperty({
    description: 'Hotel's primary contact email',
    example: 'Example contactEmail',
    required: true,
  })
  @IsNotEmpty()
  @IsEmail()
  contactEmail: string;

  @ApiProperty({
    description: 'Hotel's primary contact phone number',
    example: 'Example contactPhone',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  contactPhone: string;

  @ApiProperty({
    description: 'Hotel's star rating (1-5)',
    example: 'Example starRating',
    required: false,
  })
  @IsOptional()
  @IsNumber()
  starRating?: number;

  @ApiProperty({
    description: 'Operational status of the hotel (PENDING, ACTIVE, INACTIVE)',
    example: 'Example status',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  status: string;

  @ApiProperty({
    description: 'Timezone of the hotel (e.g., 'America/New_York')',
    example: 'Example timezone',
    required: false,
  })
  @IsOptional()
  @IsString()
  timezone?: string;

  @ApiProperty({
    description: 'Array of URLs to hotel images',
    example: 'Example images',
    required: false,
  })
  @IsOptional()
  @IsArray()
  images?: string[];

  @ApiProperty({
    description: 'Whether the hotel is active',
    example: true,
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
