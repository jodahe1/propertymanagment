import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { UpdateUserCommand } from "../ports/incoming";
import { TUserRepository } from "../ports/outgoing/user.repository";
import { UserResponseDto } from "src/user/presentation/http/dto";
import { UserMapper } from "../mappers";
import { NotFoundException } from "@nestjs/common";

@CommandHandler(UpdateUserCommand)
export class UpdateUserUseCase implements ICommandHandler<UpdateUserCommand> {
    constructor(
        private readonly userRepository: TUserRepository,
    ) { }
    
    async execute(command: UpdateUserCommand): Promise<UserResponseDto> {
        const user = await this.userRepository.findById(command.id);
        if (!user) {
            throw new NotFoundException(`User with id ${command.id} not found`);
        }
          const updatedUser = await this.userRepository.update(command.id, UserMapper.updateCommandToDomain(command, user));
        return UserMapper.toResponseDto(updatedUser);
    }
}
