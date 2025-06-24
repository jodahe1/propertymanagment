import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';
import { CreateReviewDto } from './createReview.dto';

export class UpdateReviewDto extends CreateReviewDto {
  @ApiProperty({
    description: 'The unique identifier of the review',
    example: '123e4567-e89b-12d3-a456-426614174000',
    required: true,
  })
  @IsUUID()
  id: string;
}
