import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { UpdateHousekeepingCommand } from "../ports/incoming";
import { THousekeepingRepository } from "../ports/outgoing/housekeeping.repository";
import { HousekeepingResponseDto } from "src/housekeeping/presentation/http/dto";
import { HousekeepingMapper } from "../mappers";
import { NotFoundException } from "@nestjs/common";

@CommandHandler(UpdateHousekeepingCommand)
export class UpdateHousekeepingUseCase implements ICommandHandler<UpdateHousekeepingCommand> {
    constructor(
        private readonly housekeepingRepository: THousekeepingRepository,
    ) { }
    
    async execute(command: UpdateHousekeepingCommand): Promise<HousekeepingResponseDto> {
        const housekeeping = await this.housekeepingRepository.findById(command.id);
        if (!housekeeping) {
            throw new NotFoundException(`Housekeeping with id ${command.id} not found`);
        }
          const updatedHousekeeping = await this.housekeepingRepository.update(command.id, HousekeepingMapper.updateCommandToDomain(command, housekeeping));
        return HousekeepingMapper.toResponseDto(updatedHousekeeping);
    }
}
