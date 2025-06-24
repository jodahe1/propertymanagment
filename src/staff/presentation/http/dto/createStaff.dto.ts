import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDate, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateStaffDto {
  @ApiProperty({
    description: 'Foreign key to Hotel',
    example: 'Example hotelId',
    required: true,
  })
  @IsNotEmpty()
  @IsUUID()
  hotelId: string;

  @ApiProperty({
    description: 'Foreign key to User (if staff has a user account)',
    example: 'Example userId',
    required: true,
  })
  @IsNotEmpty()
  @IsUUID()
  userId: string;

  @ApiProperty({
    description: 'Staff's position (e.g., 'Housekeeper', 'Front Desk Agent')',
    example: 'Example position',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  position: string;

  @ApiProperty({
    description: 'Employment status (e.g., ACTIVE, INACTIVE, ON_LEAVE) - will be an enum later',
    example: 'Example employmentStatus',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  employmentStatus: string;

  @ApiProperty({
    description: 'Date when the staff was hired',
    example: 'Example hireDate',
    required: true,
  })
  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  hireDate: Date;

  @ApiProperty({
    description: 'Staff's salary',
    example: 'Example salary',
    required: false,
  })
  @IsOptional()
  @IsNumber()
  salary?: number;

  @ApiProperty({
    description: 'Staff's contact phone number',
    example: 'Example contactNumber',
    required: false,
  })
  @IsOptional()
  @IsString()
  contactNumber?: string;

  @ApiProperty({
    description: 'Whether the staff is active',
    example: true,
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
