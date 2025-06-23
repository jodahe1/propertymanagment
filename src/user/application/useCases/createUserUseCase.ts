import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { CreateUserCommand } from "../ports/incoming";
import { TUserRepository } from "../ports/outgoing/user.repository";
import { UserResponseDto } from "src/user/presentation/http/dto";
import { UserMapper } from "../mappers";

@CommandHandler(CreateUserCommand)
export class CreateUserUseCase implements ICommandHandler<CreateUserCommand> {
  constructor(
    private readonly userRepository: TUserRepository,
  ) { }

  async execute(command: CreateUserCommand): Promise<UserResponseDto> {
    const createdUser = await this.userRepository.create(UserMapper.createCommandToDomain(command));
    return UserMapper.toResponseDto(createdUser);
  }
}
