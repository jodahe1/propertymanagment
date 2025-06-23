import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDate, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateHotelpolicyDto {
  @ApiProperty({
    description: 'Foreign key to Hotel',
    example: 'Example hotelId',
    required: true,
  })
  @IsNotEmpty()
  @IsUUID()
  hotelId: string;

  @ApiProperty({
    description: 'Type of policy (e.g., CANCELLATION, PET, SMOKING, CHECK_IN_OUT) - will be an enum later',
    example: 'Example policyType',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  policyType: string;

  @ApiProperty({
    description: 'Detailed description of the policy',
    example: 'Example description',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({
    description: 'Date when the policy becomes effective',
    example: 'Example effectiveDate',
    required: false,
  })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  effectiveDate?: Date;

  @ApiProperty({
    description: 'Whether the hotelpolicy is active',
    example: true,
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
