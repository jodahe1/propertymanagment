import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';
import { CreateHotelDto } from './createHotel.dto';

export class UpdateHotelDto extends CreateHotelDto {
  @ApiProperty({
    description: 'The unique identifier of the hotel',
    example: '123e4567-e89b-12d3-a456-426614174000',
    required: true,
  })
  @IsUUID()
  id: string;
}
