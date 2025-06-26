import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';
import { CreateRoomtypeavailabilitiesDto } from './createRoomtypeavailabilities.dto';

export class UpdateRoomtypeavailabilitiesDto extends CreateRoomtypeavailabilitiesDto {
  @ApiProperty({
    description: 'The unique identifier of the roomtypeavailabilities',
    example: '123e4567-e89b-12d3-a456-426614174000',
    required: true,
  })
  @IsUUID()
  id: string;
}
