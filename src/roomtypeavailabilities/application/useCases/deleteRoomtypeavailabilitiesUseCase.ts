import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { DeleteRoomtypeavailabilitiesCommand } from "../ports/incoming";
import { TRoomtypeavailabilitiesRepository } from "../ports/outgoing/roomtypeavailabilities.repository";
import { InternalServerErrorException, NotFoundException } from "@nestjs/common";

@CommandHandler(DeleteRoomtypeavailabilitiesCommand)
export class DeleteRoomtypeavailabilitiesUseCase implements ICommandHandler<DeleteRoomtypeavailabilitiesCommand> {
    constructor(
        private readonly roomtypeavailabilitiesRepository: TRoomtypeavailabilitiesRepository,
    ) { }

    async execute(command: DeleteRoomtypeavailabilitiesCommand): Promise<string> {
        const roomtypeavailabilities = await this.roomtypeavailabilitiesRepository.findById(command.id);
        if (!roomtypeavailabilities) {
            throw new NotFoundException(`Roomtypeavailabilities with id ${command.id} not found`);
        }

        const flag = await this.roomtypeavailabilitiesRepository.delete(command.id);
        if (flag)
            return `Roomtypeavailabilities with id ${command.id} deleted successfully`;
        else
            throw new InternalServerErrorException(`Roomtypeavailabilities with id ${command.id} could not be deleted`);
    }
}
