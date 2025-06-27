import { ApiProperty } from '@nestjs/swagger';
import {
  GuestGender,
  GuestIdDocumentType,
} from 'src/guest/domain/valueObjects';
export class GuestResponseDto {
  @ApiProperty({
    description: 'The unique identifier of the guest',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  id!: string;

  @ApiProperty({
    description: 'Whether the entity is active',
    example: true,
    required: true,
  })
  isActive: boolean;

  @ApiProperty({
    description: 'When the entity was created',
    example: '2023-01-01T00:00:00Z',
    required: false,
  })
  createdAt?: Date;

  @ApiProperty({
    description: 'When the entity was last updated',
    example: '2023-01-01T00:00:00Z',
    required: false,
  })
  updatedAt?: Date;

  @ApiProperty({
    description: 'Who created the entity',
    example: 'user123',
    required: false,
  })
  createdBy?: string;

  @ApiProperty({
    description: 'Who last updated the entity',
    example: 'user123',
    required: false,
  })
  updatedBy?: string;

  @ApiProperty({
    description: 'The first name of the guest',
    example: 'John',
    required: true,
  })
  first_name: string;

  @ApiProperty({
    description: 'The last name of the guest',
    example: 'Doe',
    required: true,
  })
  last_name: string;

  @ApiProperty({
    description: 'Email address of the guest',
    example: 'john.doe@example.com',
    required: true,
  })
  email: string;

  @ApiProperty({
    description: 'Phone number of the guest',
    example: '+1234567890',
    required: true,
  })
  phone: string;

  @ApiProperty({
    description: 'Address of the guest',
    example: '123 Main St',
    required: true,
  })
  address: string;

  @ApiProperty({
    description: 'Country of the guest',
    example: 'USA',
    required: true,
  })
  country: string;

  @ApiProperty({
    description: 'Country code number of the guest',
    example: 1,
    required: true,
  })
  country_num: number;

  @ApiProperty({
    description: 'City of the guest',
    example: 'New York',
    required: true,
  })
  city: string;

  @ApiProperty({
    description: 'Postcode of the guest',
    example: '10001',
    required: true,
  })
  postcode: string;

  @ApiProperty({
    description: 'Gender of the guest',
    enum: GuestGender,
    example: GuestGender.Male,
    required: true,
  })
  gender: GuestGender;

  @ApiProperty({
    description: 'ID document type of the guest',
    enum: GuestIdDocumentType,
    example: GuestIdDocumentType.Passport,
    required: true,
  })
  id_document_type: GuestIdDocumentType;

  @ApiProperty({
    description: 'ID number of the guest',
    example: 'ABC12345',
    required: true,
  })
  id_number: string;

  @ApiProperty({
    description: 'ID issue date of the guest',
    example: '2020-01-01T00:00:00Z',
    required: true,
  })
  id_issue_date: Date;

  @ApiProperty({
    description: 'ID expiry date of the guest',
    example: '2030-01-01T00:00:00Z',
    required: true,
  })
  id_expiry_date: Date;

  @ApiProperty({
    description: 'Nationality code of the guest',
    example: 840,
    required: true,
  })
  nationality: number;

  @ApiProperty({
    description: 'Date of birth of the guest',
    example: '1990-05-15T00:00:00Z',
    required: true,
  })
  date_of_birth: Date;

  @ApiProperty({
    description: 'Marketing opt-in status of the guest',
    example: true,
    required: true,
  })
  marketing_opt_in: boolean;

  @ApiProperty({
    description: 'User ID who registered the guest',
    example: '123e4567-e89b-12d3-a456-426614174000',
    required: true,
  })
  registered_by_user_id: string;

  @ApiProperty({
    description: 'Secondary address of the guest',
    example: 'Apt 4B',
    required: false,
  })
  address2?: string;

  @ApiProperty({
    description: 'State of the guest',
    example: 'NY',
    required: false,
  })
  state?: string;

  @ApiProperty({
    description: 'Indicates if the guest is an organization',
    example: false,
    required: true,
  })
  is_organization: boolean;

  @ApiProperty({
    description: 'Name of the organization if the guest is an organization',
    example: 'Acme Corp',
    required: false,
  })
  organization_name?: string;
}
