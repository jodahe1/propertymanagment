import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { CreateHousekeepingCommand } from "../ports/incoming";
import { THousekeepingRepository } from "../ports/outgoing/housekeeping.repository";
import { HousekeepingResponseDto } from "src/housekeeping/presentation/http/dto";
import { HousekeepingMapper } from "../mappers";

@CommandHandler(CreateHousekeepingCommand)
export class CreateHousekeepingUseCase implements ICommandHandler<CreateHousekeepingCommand> {
  constructor(
    private readonly housekeepingRepository: THousekeepingRepository,
  ) { }

  async execute(command: CreateHousekeepingCommand): Promise<HousekeepingResponseDto> {
    const createdHousekeeping = await this.housekeepingRepository.create(HousekeepingMapper.createCommandToDomain(command));
    return HousekeepingMapper.toResponseDto(createdHousekeeping);
  }
}
