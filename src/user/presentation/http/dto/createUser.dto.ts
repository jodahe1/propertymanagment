import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsString,
  IsNotEmpty,
  IsEmail,
  IsOptional,
  IsBoolean,
  IsDate,
  IsObject,
} from 'class-validator';
import { Type } from 'class-transformer';
import { UserRole } from 'src/user/domain/valueObjects';

export class CreateUserDto {
  @ApiProperty({
    description: "User's full name",
    example: 'John Doe',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  full_name!: string;

  @ApiProperty({
    description: "User's email address",
    example: 'john.doe@example.com',
    required: true,
  })
  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @ApiProperty({
    description: "User's phone number",
    example: '+1234567890',
    required: false,
  })
  @IsString()
  @IsOptional()
  phone_number?: string;

  @ApiProperty({
    description: "User's password",
    example: 'SecurePassword123',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  password!: string;

  @ApiProperty({
    description: "User's role (OWNER, ADMIN, STAFF)",
    example: 'STAFF',
    enum: UserRole, 
    required: true,
  })
  @IsEnum(UserRole)
  @IsNotEmpty()
  role!: UserRole;

  @ApiProperty({
    description: "Indicates if the user's account is verified",
    example: true,
    required: false,
  })
  @IsBoolean()
  @IsOptional()
  is_verified?: boolean;

  @ApiProperty({
    description: "URL to the user's profile picture",
    example: 'https://example.com/profile.jpg',
    required: false,
  })
  @IsString()
  @IsOptional()
  profile_picture?: string;

  @ApiProperty({
    description: "Timestamp of the user's last login",
    example: '2023-10-27T10:00:00Z',
    required: false,
  })
  @IsDate()
  @IsOptional()
  @Type(() => Date) 
  last_login_at?: Date;

  @ApiProperty({
    description: 'JSON string storing user permissions',
    example: '{"canEditHotels": true, "canViewBookings": false}',
    required: false,
  })
  @IsString() 
  @IsOptional()
  permissions?: string;

  @ApiProperty({
    description: 'Whether the user is active',
    example: true,
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
