import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsUUID,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';
import { AvailabilityStatus } from 'src/room/domain/valueObjects';

export class CreateRoomDto {
  @ApiProperty({
    description: 'ID of the hotel this room belongs to',
    example: '123e4567-e89b-12d3-a456-426614174000',
    required: true,
  })
  @IsUUID()
  @IsNotEmpty()
  hotel_id!: string;

  @ApiProperty({
    description: 'ID of the room type this room belongs to',
    example: '456f7890-a12c-34d5-b678-901234567890',
    required: true,
  })
  @IsUUID()
  @IsNotEmpty()
  room_type_id!: string;

  @ApiProperty({
    description: 'Unique identifier for the room within the hotel',
    example: '101A',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  room_number!: string;

  @ApiProperty({
    description: 'Floor number where the room is located',
    example: 1,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  floor_number?: number;

  @ApiProperty({
    description:
      'Current availability status of the room (AVAILABLE, BOOKED, MAINTENANCE, CLEANING)',
    example: 'AVAILABLE',
    enum: AvailabilityStatus,
    required: true,
  })
  @IsEnum(AvailabilityStatus)
  @IsNotEmpty()
  availability_status!: AvailabilityStatus;

  @ApiProperty({
    description:
      'Current price of the room, potentially overridden from base price',
    example: 165.5,
    required: true,
  })
  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  @Type(() => Number)
  current_price!: number;

  @ApiProperty({
    description: 'Any special notes about the room',
    example: 'Room has a connecting door to 102A',
    required: false,
  })
  @IsOptional()
  @IsString()
  notes?: string;
}
