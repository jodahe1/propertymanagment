import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';
import { CreatePromotionDto } from './createPromotion.dto';

export class UpdatePromotionDto extends CreatePromotionDto {
  @ApiProperty({
    description: 'The unique identifier of the promotion',
    example: '123e4567-e89b-12d3-a456-426614174000',
    required: true,
  })
  @IsUUID()
  id: string;
}
