import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDate, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateRoomDto {
  @ApiProperty({
    description: 'Foreign key to RoomType',
    example: 'Example roomTypeId',
    required: true,
  })
  @IsNotEmpty()
  @IsUUID()
  roomTypeId: string;

  @ApiProperty({
    description: 'Unique room number (e.g., '101A')',
    example: 'Example roomNumber',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  roomNumber: string;

  @ApiProperty({
    description: 'Floor number where the room is located',
    example: 'Example floor',
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  floor: number;

  @ApiProperty({
    description: 'Current status of the room (e.g., AVAILABLE, OCCUPIED, MAINTENANCE, CLEANING) - will be an enum later',
    example: 'Example status',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  status: string;

  @ApiProperty({
    description: 'Timestamp of the last cleaning',
    example: 'Example lastCleanedAt',
    required: false,
  })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  lastCleanedAt?: Date;

  @ApiProperty({
    description: 'Any special notes about the room',
    example: 'Example notes',
    required: false,
  })
  @IsOptional()
  @IsString()
  notes?: string;

  @ApiProperty({
    description: 'Whether the room is active',
    example: true,
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
