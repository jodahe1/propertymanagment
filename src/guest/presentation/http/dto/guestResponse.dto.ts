import { ApiProperty } from '@nestjs/swagger';

export class GuestResponseDto {
  @ApiProperty({
    description: 'The unique identifier of the guest',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  id!: string;

  @ApiProperty({
    description: 'Whether the entity is active',
    example: 'true',
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
    description: 'Guest's full name',
    example: 'Example fullName',
    required: true,
  })
  fullName: string;

  @ApiProperty({
    description: 'Guest's email (unique)',
    example: 'Example email',
    required: true,
  })
  email: string;

  @ApiProperty({
    description: 'Guest's phone number',
    example: 'Example phoneNumber',
    required: false,
  })
  phoneNumber?: string;

  @ApiProperty({
    description: 'Guest's street address',
    example: 'Example address',
    required: false,
  })
  address?: string;

  @ApiProperty({
    description: 'City of residence',
    example: 'Example city',
    required: false,
  })
  city?: string;

  @ApiProperty({
    description: 'Country of residence',
    example: 'Example country',
    required: false,
  })
  country?: string;

  @ApiProperty({
    description: 'Postal or ZIP code',
    example: 'Example zipCode',
    required: false,
  })
  zipCode?: string;

  @ApiProperty({
    description: 'Guest's date of birth',
    example: 'Example dateOfBirth',
    required: false,
  })
  dateOfBirth?: Date;

  @ApiProperty({
    description: 'Guest's nationality',
    example: 'Example nationality',
    required: false,
  })
  nationality?: string;

  @ApiProperty({
    description: 'Type of ID document (e.g., PASSPORT, NATIONAL_ID, DRIVER_LICENSE) - will be an enum later',
    example: 'Example idDocumentType',
    required: true,
  })
  idDocumentType: string;

  @ApiProperty({
    description: 'ID document number',
    example: 'Example idDocumentNumber',
    required: true,
  })
  idDocumentNumber: string;

  @ApiProperty({
    description: 'Any special notes about the guest',
    example: 'Example notes',
    required: false,
  })
  notes?: string;
}
