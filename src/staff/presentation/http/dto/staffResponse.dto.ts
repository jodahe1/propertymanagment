import { ApiProperty } from '@nestjs/swagger';

export class StaffResponseDto {
  @ApiProperty({
    description: 'The unique identifier of the staff',
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
    description: 'Foreign key to Hotel',
    example: 'Example hotelId',
    required: true,
  })
  hotelId: string;

  @ApiProperty({
    description: 'Foreign key to User (if staff has a user account)',
    example: 'Example userId',
    required: true,
  })
  userId: string;

  @ApiProperty({
    description: 'Staff's position (e.g., 'Housekeeper', 'Front Desk Agent')',
    example: 'Example position',
    required: true,
  })
  position: string;

  @ApiProperty({
    description: 'Employment status (e.g., ACTIVE, INACTIVE, ON_LEAVE) - will be an enum later',
    example: 'Example employmentStatus',
    required: true,
  })
  employmentStatus: string;

  @ApiProperty({
    description: 'Date when the staff was hired',
    example: 'Example hireDate',
    required: true,
  })
  hireDate: Date;

  @ApiProperty({
    description: 'Staff's salary',
    example: 'Example salary',
    required: false,
  })
  salary?: number;

  @ApiProperty({
    description: 'Staff's contact phone number',
    example: 'Example contactNumber',
    required: false,
  })
  contactNumber?: string;
}
