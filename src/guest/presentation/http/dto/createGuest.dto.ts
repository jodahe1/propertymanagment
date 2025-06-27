import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  IsEnum,
} from 'class-validator';
import { Type } from 'class-transformer';
import {
  GuestGender,
  GuestIdDocumentType,
} from 'src/guest/domain/valueObjects';

export class CreateGuestDto {
  @ApiProperty({
    description: 'The first name of the guest',
    example: 'John',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  first_name: string;

  @ApiProperty({
    description: 'The last name of the guest',
    example: 'Doe',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  last_name: string;

  @ApiProperty({
    description: 'Email address of the guest',
    example: 'john.doe@example.com',
    required: true,
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Phone number of the guest',
    example: '+1234567890',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  phone: string;

  @ApiProperty({
    description: 'Address of the guest',
    example: '123 Main St',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  address: string;

  @ApiProperty({
    description: 'Country of the guest',
    example: 'USA',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  country: string;

  @ApiProperty({
    description: 'Country code number of the guest',
    example: 1,
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  country_num: number;

  @ApiProperty({
    description: 'City of the guest',
    example: 'New York',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  city: string;

  @ApiProperty({
    description: 'Postcode of the guest',
    example: '10001',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  postcode: string;

  @ApiProperty({
    description: 'Gender of the guest',
    enum: GuestGender,
    example: GuestGender.Male,
    required: true,
  })
  @IsNotEmpty()
  @IsEnum(GuestGender)
  gender: GuestGender;

  @ApiProperty({
    description: 'ID document type of the guest',
    enum: GuestIdDocumentType,
    example: GuestIdDocumentType.Passport,
    required: true,
  })
  @IsNotEmpty()
  @IsEnum(GuestIdDocumentType)
  id_document_type: GuestIdDocumentType;

  @ApiProperty({
    description: 'ID number of the guest',
    example: 'ABC12345',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  id_number: string;

  @ApiProperty({
    description: 'ID issue date of the guest',
    example: '2020-01-01',
    required: true,
  })
  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  id_issue_date: Date;

  @ApiProperty({
    description: 'ID expiry date of the guest',
    example: '2030-01-01',
    required: true,
  })
  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  id_expiry_date: Date;

  @ApiProperty({
    description: 'Nationality code of the guest',
    example: 840,
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  nationality: number;

  @ApiProperty({
    description: 'Date of birth of the guest',
    example: '1990-05-15',
    required: true,
  })
  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  date_of_birth: Date;

  @ApiProperty({
    description: 'Marketing opt-in status of the guest',
    example: true,
    required: true,
  })
  @IsNotEmpty()
  @IsBoolean()
  marketing_opt_in: boolean;

  @ApiProperty({
    description: 'User ID who registered the guest',
    example: '123e4567-e89b-12d3-a456-426614174000',
    required: true,
  })
  @IsNotEmpty()
  @IsUUID()
  registered_by_user_id: string;

  @ApiProperty({
    description: 'Secondary address of the guest',
    example: 'Apt 4B',
    required: false,
  })
  @IsOptional()
  @IsString()
  address2?: string;

  @ApiProperty({
    description: 'State of the guest',
    example: 'NY',
    required: false,
  })
  @IsOptional()
  @IsString()
  state?: string;

  @ApiProperty({
    description: 'Indicates if the guest is an organization',
    example: false,
    required: true,
  })
  @IsNotEmpty()
  @IsBoolean()
  is_organization: boolean;

  @ApiProperty({
    description: 'Name of the organization if the guest is an organization',
    example: 'Acme Corp',
    required: false,
  })
  @IsOptional()
  @IsString()
  organization_name?: string;

  @ApiProperty({
    description: 'Whether the guest is active',
    example: true,
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
