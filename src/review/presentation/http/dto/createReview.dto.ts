import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';


export class CreateReviewDto {
  @ApiProperty({
    description: 'Foreign key to Hotel',
    example: 'Example hotelId',
    required: true,
  })
  @IsNotEmpty()
  @IsUUID()
  hotelId: string;

  @ApiProperty({
    description: 'Foreign key to Guest',
    example: 'Example guestId',
    required: true,
  })
  @IsNotEmpty()
  @IsUUID()
  guestId: string;

  @ApiProperty({
    description: 'Rating given (1-5)',
    example: 'Example rating',
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  rating: number;

  @ApiProperty({
    description: 'Guest's comment for the review',
    example: 'Example comment',
    required: false,
  })
  @IsOptional()
  @IsString()
  comment?: string;

  @ApiProperty({
    description: 'Whether the review is active',
    example: true,
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
