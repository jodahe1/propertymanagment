import { User } from 'src/user/domain/entities/user.entity';
import { CreateUserDto, UpdateUserDto, UserResponseDto } from 'src/user/presentation/http/dto';
import { CreateUserCommand, UpdateUserCommand } from '../ports/incoming';
import { PaginatedResponseDto, PaginatedResult, PaginationMapper } from '@shared/shared-kernel';

export class UserMapper {
    static createDtoToCommand(dto: CreateUserDto): CreateUserCommand {
        return new CreateUserCommand(
            dto.fullName,
            dto.email,
            dto.phoneNumber,
            dto.password,
            dto.role,
            dto.isVerified,
            dto.profilePicture,
            dto.lastLoginAt,
            dto.isActive,
        );
    }
    
    static updateDtoToCommand(dto: UpdateUserDto): UpdateUserCommand {
        return new UpdateUserCommand(
            dto.id,
            dto.fullName,
            dto.email,
            dto.phoneNumber,
            dto.password,
            dto.role,
            dto.isVerified,
            dto.profilePicture,
            dto.lastLoginAt,
            dto.isActive,
        );
    }
    
    static createCommandToDomain(command: CreateUserCommand): User {
        return new User(
            command.fullName,
            command.email,
            command.phoneNumber,
            command.password,
            command.role,
            command.isVerified,
            command.profilePicture,
            command.lastLoginAt,
            null,
            command.isActive,
        );
    }    static updateCommandToDomain(command: UpdateUserCommand, user: User): User {
        user.update(
            command.fullName,
            command.email,
            command.phoneNumber,
            command.password,
            command.role,
            command.isVerified,
            command.profilePicture,
            command.lastLoginAt,
            command.isActive,
        );
        return user;
    }

    static toResponseDto(user: User): UserResponseDto {
        return {
            id: user.id,
            fullName: user.fullName,
            email: user.email,
            phoneNumber: user.phoneNumber,
            password: user.password,
            role: user.role,
            isVerified: user.isVerified,
            profilePicture: user.profilePicture,
            lastLoginAt: user.lastLoginAt,
            isActive: user.isActive,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
            createdBy: user.createdBy,
            updatedBy: user.updatedBy,
        };
    }
    
    static toPaginatedResponseDto(paginatedData: PaginatedResult<User>): PaginatedResponseDto<UserResponseDto> {
        return PaginationMapper.toPaginatedResponseDto(
            paginatedData,
            (item) => this.toResponseDto(item)
        );
    }
}
