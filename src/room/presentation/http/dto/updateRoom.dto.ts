import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';
import { CreateRoomDto } from './createRoom.dto';

export class UpdateRoomDto extends CreateRoomDto {
  @ApiProperty({
    description: 'The unique identifier of the room',
    example: 'abcd1234-abcd-1234-abcd-1234abcd1234',
    required: true,
  })
  @IsUUID()
  id!: string;
}
