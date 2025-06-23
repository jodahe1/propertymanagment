import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { UpdateHotelpolicyCommand } from "../ports/incoming";
import { THotelpolicyRepository } from "../ports/outgoing/hotelpolicy.repository";
import { HotelpolicyResponseDto } from "src/hotelpolicy/presentation/http/dto";
import { HotelpolicyMapper } from "../mappers";
import { NotFoundException } from "@nestjs/common";

@CommandHandler(UpdateHotelpolicyCommand)
export class UpdateHotelpolicyUseCase implements ICommandHandler<UpdateHotelpolicyCommand> {
    constructor(
        private readonly hotelpolicyRepository: THotelpolicyRepository,
    ) { }
    
    async execute(command: UpdateHotelpolicyCommand): Promise<HotelpolicyResponseDto> {
        const hotelpolicy = await this.hotelpolicyRepository.findById(command.id);
        if (!hotelpolicy) {
            throw new NotFoundException(`Hotelpolicy with id ${command.id} not found`);
        }
          const updatedHotelpolicy = await this.hotelpolicyRepository.update(command.id, HotelpolicyMapper.updateCommandToDomain(command, hotelpolicy));
        return HotelpolicyMapper.toResponseDto(updatedHotelpolicy);
    }
}
