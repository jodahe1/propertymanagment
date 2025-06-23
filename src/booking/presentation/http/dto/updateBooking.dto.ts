import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';
import { CreateBookingDto } from './createBooking.dto';

export class UpdateBookingDto extends CreateBookingDto {
  @ApiProperty({
    description: 'The unique identifier of the booking',
    example: '123e4567-e89b-12d3-a456-426614174000',
    required: true,
  })
  @IsUUID()
  id: string;
}
