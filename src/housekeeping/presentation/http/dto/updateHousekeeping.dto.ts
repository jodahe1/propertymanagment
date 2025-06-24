import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';
import { CreateHousekeepingDto } from './createHousekeeping.dto';

export class UpdateHousekeepingDto extends CreateHousekeepingDto {
  @ApiProperty({
    description: 'The unique identifier of the housekeeping',
    example: '123e4567-e89b-12d3-a456-426614174000',
    required: true,
  })
  @IsUUID()
  id: string;
}
