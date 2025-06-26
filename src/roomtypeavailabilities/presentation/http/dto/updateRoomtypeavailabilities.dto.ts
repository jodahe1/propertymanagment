import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsOptional, IsEnum } from 'class-validator';
import { CreateRoomtypeavailabilitiesDto } from './createRoomtypeavailabilities.dto';
import { BlockedReason } from 'src/roomtypeavailabilities/domain/valueObjects/blocked-reason.enum';

export class UpdateRoomtypeavailabilitiesDto extends CreateRoomtypeavailabilitiesDto {
  @ApiProperty({
    description: 'The unique identifier of the roomtypeavailabilities',
    example: '123e4567-e89b-12d3-a456-426614174000',
    required: true,
  })
  @IsUUID()
  id: string;

  @ApiProperty({
    description: 'Reason if the entire room type is blocked for this date',
    example: 'MAINTENANCE',
    enum: BlockedReason,
    required: false,
  })
  @IsOptional()
  @IsEnum(BlockedReason)
  blockedReason?: BlockedReason;
}