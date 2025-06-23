import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { DeleteUserCommand } from "../ports/incoming";
import { TUserRepository } from "../ports/outgoing/user.repository";
import { InternalServerErrorException, NotFoundException } from "@nestjs/common";

@CommandHandler(DeleteUserCommand)
export class DeleteUserUseCase implements ICommandHandler<DeleteUserCommand> {
    constructor(
        private readonly userRepository: TUserRepository,
    ) { }

    async execute(command: DeleteUserCommand): Promise<string> {
        const user = await this.userRepository.findById(command.id);
        if (!user) {
            throw new NotFoundException(`User with id ${command.id} not found`);
        }

        const flag = await this.userRepository.delete(command.id);
        if (flag)
            return `User with id ${command.id} deleted successfully`;
        else
            throw new InternalServerErrorException(`User with id ${command.id} could not be deleted`);
    }
}
