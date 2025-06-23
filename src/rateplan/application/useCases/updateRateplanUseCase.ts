import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { UpdateRateplanCommand } from "../ports/incoming";
import { TRateplanRepository } from "../ports/outgoing/rateplan.repository";
import { RateplanResponseDto } from "src/rateplan/presentation/http/dto";
import { RateplanMapper } from "../mappers";
import { NotFoundException } from "@nestjs/common";

@CommandHandler(UpdateRateplanCommand)
export class UpdateRateplanUseCase implements ICommandHandler<UpdateRateplanCommand> {
    constructor(
        private readonly rateplanRepository: TRateplanRepository,
    ) { }
    
    async execute(command: UpdateRateplanCommand): Promise<RateplanResponseDto> {
        const rateplan = await this.rateplanRepository.findById(command.id);
        if (!rateplan) {
            throw new NotFoundException(`Rateplan with id ${command.id} not found`);
        }
          const updatedRateplan = await this.rateplanRepository.update(command.id, RateplanMapper.updateCommandToDomain(command, rateplan));
        return RateplanMapper.toResponseDto(updatedRateplan);
    }
}
