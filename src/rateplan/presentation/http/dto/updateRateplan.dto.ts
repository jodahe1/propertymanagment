import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';
import { CreateRateplanDto } from './createRateplan.dto';

export class UpdateRateplanDto extends CreateRateplanDto {
  @ApiProperty({
    description: 'The unique identifier of the rateplan',
    example: '123e4567-e89b-12d3-a456-426614174000',
    required: true,
  })
  @IsUUID()
  id: string;
}
