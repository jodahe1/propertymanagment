import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDate, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateHousekeepingDto {
  @ApiProperty({
    description: 'Foreign key to Room',
    example: 'Example roomId',
    required: true,
  })
  @IsNotEmpty()
  @IsUUID()
  roomId: string;

  @ApiProperty({
    description: 'Foreign key to Staff',
    example: 'Example staffId',
    required: true,
  })
  @IsNotEmpty()
  @IsUUID()
  staffId: string;

  @ApiProperty({
    description: 'Housekeeping status (e.g., PENDING, IN_PROGRESS, COMPLETED) - will be an enum later',
    example: 'Example status',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  status: string;

  @ApiProperty({
    description: 'Any special notes for housekeeping',
    example: 'Example notes',
    required: false,
  })
  @IsOptional()
  @IsString()
  notes?: string;

  @ApiProperty({
    description: 'Timestamp when the housekeeping task was completed',
    example: 'Example completedAt',
    required: false,
  })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  completedAt?: Date;

  @ApiProperty({
    description: 'Whether the housekeeping is active',
    example: true,
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
