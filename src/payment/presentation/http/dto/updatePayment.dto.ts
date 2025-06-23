import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';
import { CreatePaymentDto } from './createPayment.dto';

export class UpdatePaymentDto extends CreatePaymentDto {
  @ApiProperty({
    description: 'The unique identifier of the payment',
    example: '123e4567-e89b-12d3-a456-426614174000',
    required: true,
  })
  @IsUUID()
  id: string;
}
