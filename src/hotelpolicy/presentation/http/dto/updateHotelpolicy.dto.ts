import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';
import { CreateHotelpolicyDto } from './createHotelpolicy.dto';

export class UpdateHotelpolicyDto extends CreateHotelpolicyDto {
  @ApiProperty({
    description: 'The unique identifier of the hotelpolicy',
    example: '123e4567-e89b-12d3-a456-426614174000',
    required: true,
  })
  @IsUUID()
  id: string;
}
