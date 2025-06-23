import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { DeleteHotelpolicyCommand } from "../ports/incoming";
import { THotelpolicyRepository } from "../ports/outgoing/hotelpolicy.repository";
import { InternalServerErrorException, NotFoundException } from "@nestjs/common";

@CommandHandler(DeleteHotelpolicyCommand)
export class DeleteHotelpolicyUseCase implements ICommandHandler<DeleteHotelpolicyCommand> {
    constructor(
        private readonly hotelpolicyRepository: THotelpolicyRepository,
    ) { }

    async execute(command: DeleteHotelpolicyCommand): Promise<string> {
        const hotelpolicy = await this.hotelpolicyRepository.findById(command.id);
        if (!hotelpolicy) {
            throw new NotFoundException(`Hotelpolicy with id ${command.id} not found`);
        }

        const flag = await this.hotelpolicyRepository.delete(command.id);
        if (flag)
            return `Hotelpolicy with id ${command.id} deleted successfully`;
        else
            throw new InternalServerErrorException(`Hotelpolicy with id ${command.id} could not be deleted`);
    }
}
