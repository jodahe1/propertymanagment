import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';
import { CreateServiceproductDto } from './createServiceproduct.dto';

export class UpdateServiceproductDto extends CreateServiceproductDto {
  @ApiProperty({
    description: 'The unique identifier of the serviceproduct',
    example: '123e4567-e89b-12d3-a456-426614174000',
    required: true,
  })
  @IsUUID()
  id: string;
}
