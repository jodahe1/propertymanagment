import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { CreateRateplanCommand } from "../ports/incoming";
import { TRateplanRepository } from "../ports/outgoing/rateplan.repository";
import { RateplanResponseDto } from "src/rateplan/presentation/http/dto";
import { RateplanMapper } from "../mappers";

@CommandHandler(CreateRateplanCommand)
export class CreateRateplanUseCase implements ICommandHandler<CreateRateplanCommand> {
  constructor(
    private readonly rateplanRepository: TRateplanRepository,
  ) { }

  async execute(command: CreateRateplanCommand): Promise<RateplanResponseDto> {
    const createdRateplan = await this.rateplanRepository.create(RateplanMapper.createCommandToDomain(command));
    return RateplanMapper.toResponseDto(createdRateplan);
  }
}
