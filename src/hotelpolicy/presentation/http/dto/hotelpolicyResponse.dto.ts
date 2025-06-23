import { ApiProperty } from '@nestjs/swagger';

export class HotelpolicyResponseDto {
  @ApiProperty({
    description: 'The unique identifier of the hotelpolicy',
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
    description: 'Type of policy (e.g., CANCELLATION, PET, SMOKING, CHECK_IN_OUT) - will be an enum later',
    example: 'Example policyType',
    required: true,
  })
  policyType: string;

  @ApiProperty({
    description: 'Detailed description of the policy',
    example: 'Example description',
    required: true,
  })
  description: string;

  @ApiProperty({
    description: 'Date when the policy becomes effective',
    example: 'Example effectiveDate',
    required: false,
  })
  effectiveDate?: Date;
}
