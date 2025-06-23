import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';
import { CreateRoomDto } from './createRoom.dto';

export class UpdateRoomDto extends CreateRoomDto {
  @ApiProperty({
    description: 'The unique identifier of the room',
    example: '123e4567-e89b-12d3-a456-426614174000',
    required: true,
  })
  @IsUUID()
  id: string;
}
