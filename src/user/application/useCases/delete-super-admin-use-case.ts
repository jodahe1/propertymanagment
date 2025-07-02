import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteSuperAdminCommand } from '../ports/incoming/commands/delete-super-admin.command'; // Correct path
import { TUserRepository } from '../ports/outgoing/user.repository';
import {
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common'; 

@CommandHandler(DeleteSuperAdminCommand)
export class DeleteSuperAdminUseCase
  implements ICommandHandler<DeleteSuperAdminCommand>
{
  constructor(private readonly userRepository: TUserRepository) {}

  async execute(command: DeleteSuperAdminCommand): Promise<string> {
    const user = await this.userRepository.findById(command.id);

    if (!user) {
      throw new NotFoundException(`SuperAdmin with id ${command.id} not found`);
    }

    if (!user.isSuperAdmin()) {
      throw new UnauthorizedException(
        `User with id ${command.id} is not a SuperAdmin and cannot be deleted via this endpoint.`,
      );
    }

    const flag = await this.userRepository.delete(command.id);
    if (flag) {
      return `SuperAdmin with id ${command.id} deleted successfully`;
    } else {
      throw new InternalServerErrorException(
        `SuperAdmin with id ${command.id} could not be deleted`,
      );
    }
  }
}
