import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';
import { CreateRoomtypeDto } from './createRoomtype.dto';

export class UpdateRoomtypeDto extends CreateRoomtypeDto {
  @ApiProperty({
    description: 'The unique identifier of the roomtype',
    example: '123e4567-e89b-12d3-a456-426614174000',
    required: true,
  })
  @IsUUID()
  id: string;
}
