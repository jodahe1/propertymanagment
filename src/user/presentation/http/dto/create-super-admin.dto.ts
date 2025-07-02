import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsOptional,
  IsDate,
  IsBoolean,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateSuperAdminDto {
  @ApiProperty({
    description: "User's email address",
    example: 'superadmin@example.com',
    required: true,
  })
  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @ApiProperty({
    description: "User's password",
    example: 'SuperSecurePass123!',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  password!: string;

  @ApiProperty({
    description: "Timestamp of the user's last login (optional)",
    example: '2023-10-27T10:00:00Z',
    required: false,
  })
  @IsDate()
  @IsOptional()
  @Type(() => Date)
  last_login_at?: Date;

  @ApiProperty({
    description:
      'Whether the SuperAdmin user is active (optional, default to true)',
    example: true,
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
