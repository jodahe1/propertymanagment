import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateSuperAdminCommand } from '../ports/incoming/commands/create-super-admin.command'; // Correct path
import { TUserRepository } from '../ports/outgoing/user.repository';
import { SuperAdminResponseDto } from 'src/user/presentation/http/dto/super-admin-response.dto';
import { User } from 'src/user/domain/entities/user.entity';
import { UserRole } from 'src/user/domain/valueObjects';
import { UserMapper } from '../mappers';

@CommandHandler(CreateSuperAdminCommand)
export class CreateSuperAdminUseCase
  implements ICommandHandler<CreateSuperAdminCommand>
{
  constructor(private readonly userRepository: TUserRepository) {}

  async execute(
    command: CreateSuperAdminCommand,
  ): Promise<SuperAdminResponseDto> {
    const newUser = new User(
      'Super Admin User', // Default full_name for SuperAdmin creation
      command.email,
      command.password,
      UserRole.SUPER_ADMIN, // Explicitly set role to SUPER_ADMIN
      undefined, // phone_number (not provided in command) Not Needed For Super Admin
      false, // is_verified (default, can be overridden if needed) Not Needed For Super Admin
      undefined, // profile_picture (not provided in command) Not Needed For Super Admin
      command.last_login_at,
      undefined, // permissions (not provided in command) Not Needed For Super Admin
      command.isActive ?? true, // isActive, default to true if not provided
    );

    const createdSuperAdmin = await this.userRepository.create(newUser);
    return UserMapper.toResponseDto(createdSuperAdmin);
  }
}
