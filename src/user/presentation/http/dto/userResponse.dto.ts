import { ApiProperty } from '@nestjs/swagger';

export class UserResponseDto {
  @ApiProperty({
    description: 'The unique identifier of the user',
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
    description: 'User\'s full name',
    example: 'Example full_name',
    required: true,
  })
  full_name: string;

  @ApiProperty({
    description: 'User\'s email address',
    example: 'Example email',
    required: true,
  })
  email: string;

  @ApiProperty({
    description: 'User\'s phone number',
    example: 'Example phone_number',
    required: false,
  })
  phone_number?: string;

  @ApiProperty({
    description: 'User\'s password',
    example: 'Example password',
    required: true,
  })
  password: string;

  @ApiProperty({
    description: 'User\'s role (OWNER, ADMIN, STAFF)',
    example: 'Example role',
    required: true,
  })
  role: string;

  @ApiProperty({
    description: 'Indicates if the user\'s account is verified',
    example: 'Example is_verified',
    required: false,
  })
  is_verified?: boolean;

  @ApiProperty({
    description: 'URL to the user\'s profile picture',
    example: 'Example profile_picture',
    required: false,
  })
  profile_picture?: string;

  @ApiProperty({
    description: 'Timestamp of the user\'s last login',
    example: 'Example last_login_at',
    required: false,
  })
  last_login_at?: Date;

  @ApiProperty({
    description: 'JSON string storing user permissions',
    example: 'Example permissions',
    required: false,
  })
  permissions?: string;
}
