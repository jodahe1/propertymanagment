import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { DeleteHousekeepingCommand } from "../ports/incoming";
import { THousekeepingRepository } from "../ports/outgoing/housekeeping.repository";
import { InternalServerErrorException, NotFoundException } from "@nestjs/common";

@CommandHandler(DeleteHousekeepingCommand)
export class DeleteHousekeepingUseCase implements ICommandHandler<DeleteHousekeepingCommand> {
    constructor(
        private readonly housekeepingRepository: THousekeepingRepository,
    ) { }

    async execute(command: DeleteHousekeepingCommand): Promise<string> {
        const housekeeping = await this.housekeepingRepository.findById(command.id);
        if (!housekeeping) {
            throw new NotFoundException(`Housekeeping with id ${command.id} not found`);
        }

        const flag = await this.housekeepingRepository.delete(command.id);
        if (flag)
            return `Housekeeping with id ${command.id} deleted successfully`;
        else
            throw new InternalServerErrorException(`Housekeeping with id ${command.id} could not be deleted`);
    }
}
