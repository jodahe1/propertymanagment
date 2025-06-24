import { User } from 'src/user/domain/entities/user.entity';
import {
  CreateUserDto,
  UpdateUserDto,
  UserResponseDto,
} from 'src/user/presentation/http/dto';
import { CreateUserCommand, UpdateUserCommand } from '../ports/incoming';
import {
  PaginatedResponseDto,
  PaginatedResult,
  PaginationMapper,
} from '@shared/shared-kernel';
import { UserRole } from 'src/user/domain/valueObjects';
export class UserMapper {
  static createDtoToCommand(dto: CreateUserDto): CreateUserCommand {
    return new CreateUserCommand(
      dto.full_name,
      dto.email,
      dto.phone_number,
      dto.password,
      dto.role as UserRole,
      dto.is_verified,
      dto.profile_picture,
      dto.last_login_at,
      dto.permissions,
      dto.isActive,
    );
  }

  static updateDtoToCommand(dto: UpdateUserDto): UpdateUserCommand {
    return new UpdateUserCommand(
      dto.id,
      dto.full_name,
      dto.email,
      dto.phone_number,
      dto.password,
      dto.role as UserRole, // <-- Cast to UserRole
      dto.is_verified,
      dto.profile_picture,
      dto.last_login_at,
      dto.permissions,
      dto.isActive,
    );
  }

  static createCommandToDomain(command: CreateUserCommand): User {
    return new User(
      command.full_name,
      command.email,
      command.password,
      command.role as UserRole,
      command.phone_number,
      command.is_verified,
      command.profile_picture,
      command.last_login_at,
      command.permissions,
      command.isActive,
    );
  }
  static updateCommandToDomain(command: UpdateUserCommand, user: User): User {
    user.update(
      command.full_name,
      command.email,
      command.password,
      command.role as UserRole, // <-- Cast to UserRole
      command.phone_number,
      command.is_verified,
      command.profile_picture,
      command.last_login_at,
      command.permissions,
      command.isActive,
    );
    return user;
  }

  static toResponseDto(user: User): UserResponseDto {
    return {
      id: user.id,
      full_name: user.full_name,
      email: user.email,
      phone_number: user.phone_number,
      password: user.password,
      role: user.role,
      is_verified: user.is_verified,
      profile_picture: user.profile_picture,
      last_login_at: user.last_login_at,
      permissions: user.permissions,
      isActive: user.isActive,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      createdBy: user.createdBy,
      updatedBy: user.updatedBy,
    };
  }

  static toPaginatedResponseDto(
    paginatedData: PaginatedResult<User>,
  ): PaginatedResponseDto<UserResponseDto> {
    return PaginationMapper.toPaginatedResponseDto(paginatedData, (item) =>
      this.toResponseDto(item),
    );
  }
}
