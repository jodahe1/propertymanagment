import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { CreateHotelpolicyCommand } from "../ports/incoming";
import { THotelpolicyRepository } from "../ports/outgoing/hotelpolicy.repository";
import { HotelpolicyResponseDto } from "src/hotelpolicy/presentation/http/dto";
import { HotelpolicyMapper } from "../mappers";

@CommandHandler(CreateHotelpolicyCommand)
export class CreateHotelpolicyUseCase implements ICommandHandler<CreateHotelpolicyCommand> {
  constructor(
    private readonly hotelpolicyRepository: THotelpolicyRepository,
  ) { }

  async execute(command: CreateHotelpolicyCommand): Promise<HotelpolicyResponseDto> {
    const createdHotelpolicy = await this.hotelpolicyRepository.create(HotelpolicyMapper.createCommandToDomain(command));
    return HotelpolicyMapper.toResponseDto(createdHotelpolicy);
  }
}
