import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';
import { CreateInvoiceDto } from './createInvoice.dto';

export class UpdateInvoiceDto extends CreateInvoiceDto {
  @ApiProperty({
    description: 'The unique identifier of the invoice',
    example: '123e4567-e89b-12d3-a456-426614174000',
    required: true,
  })
  @IsUUID()
  id: string;
}
