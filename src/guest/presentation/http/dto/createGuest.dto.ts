import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDate, IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateGuestDto {
  @ApiProperty({
    description: 'Guest's full name',
    example: 'Example fullName',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  fullName: string;

  @ApiProperty({
    description: 'Guest's email (unique)',
    example: 'Example email',
    required: true,
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Guest's phone number',
    example: 'Example phoneNumber',
    required: false,
  })
  @IsOptional()
  @IsString()
  phoneNumber?: string;

  @ApiProperty({
    description: 'Guest's street address',
    example: 'Example address',
    required: false,
  })
  @IsOptional()
  @IsString()
  address?: string;

  @ApiProperty({
    description: 'City of residence',
    example: 'Example city',
    required: false,
  })
  @IsOptional()
  @IsString()
  city?: string;

  @ApiProperty({
    description: 'Country of residence',
    example: 'Example country',
    required: false,
  })
  @IsOptional()
  @IsString()
  country?: string;

  @ApiProperty({
    description: 'Postal or ZIP code',
    example: 'Example zipCode',
    required: false,
  })
  @IsOptional()
  @IsString()
  zipCode?: string;

  @ApiProperty({
    description: 'Guest's date of birth',
    example: 'Example dateOfBirth',
    required: false,
  })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  dateOfBirth?: Date;

  @ApiProperty({
    description: 'Guest's nationality',
    example: 'Example nationality',
    required: false,
  })
  @IsOptional()
  @IsString()
  nationality?: string;

  @ApiProperty({
    description: 'Type of ID document (e.g., PASSPORT, NATIONAL_ID, DRIVER_LICENSE) - will be an enum later',
    example: 'Example idDocumentType',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  idDocumentType: string;

  @ApiProperty({
    description: 'ID document number',
    example: 'Example idDocumentNumber',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  idDocumentNumber: string;

  @ApiProperty({
    description: 'Any special notes about the guest',
    example: 'Example notes',
    required: false,
  })
  @IsOptional()
  @IsString()
  notes?: string;

  @ApiProperty({
    description: 'Whether the guest is active',
    example: true,
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
