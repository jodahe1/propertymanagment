import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';
import { CreateRoomTypeDto } from './createRoomType.dto';

export class UpdateRoomTypeDto extends CreateRoomTypeDto {
  @ApiProperty({
    description: 'The unique identifier of the room type',
    example: '123e4567-e89b-12d3-a456-426614174000',
    required: true,
  })
  @IsUUID()
  id!: string;
}
