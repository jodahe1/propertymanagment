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
    description: 'User's full name',
    example: 'Example fullName',
    required: true,
  })
  fullName: string;

  @ApiProperty({
    description: 'User's email',
    example: 'test@example.com',
    required: true,
  })
  email: string;

  @ApiProperty({
    description: 'User's phone number',
    example: 'Example phoneNumber',
    required: false,
  })
  phoneNumber?: string;

  @ApiProperty({
    description: 'User's password (will be handled by Identity Server)',
    example: 'Example password',
    required: true,
  })
  password: string;

  @ApiProperty({
    description: 'User's role',
    example: 'OWNER',
    required: true,
  })
  role: string;

  @ApiProperty({
    description: 'Is user email verified?',
    example: 'False',
    required: false,
  })
  isVerified?: boolean;

  @ApiProperty({
    description: 'URL to profile picture',
    example: 'Example profilePicture',
    required: false,
  })
  profilePicture?: string;

  @ApiProperty({
    description: 'Last login timestamp',
    example: 'Example lastLoginAt',
    required: false,
  })
  lastLoginAt?: Date;
}
