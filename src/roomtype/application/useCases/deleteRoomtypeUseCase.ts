import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { DeleteRoomtypeCommand } from "../ports/incoming";
import { TRoomtypeRepository } from "../ports/outgoing/roomtype.repository";
import { InternalServerErrorException, NotFoundException } from "@nestjs/common";

@CommandHandler(DeleteRoomtypeCommand)
export class DeleteRoomtypeUseCase implements ICommandHandler<DeleteRoomtypeCommand> {
    constructor(
        private readonly roomtypeRepository: TRoomtypeRepository,
    ) { }

    async execute(command: DeleteRoomtypeCommand): Promise<string> {
        const roomtype = await this.roomtypeRepository.findById(command.id);
        if (!roomtype) {
            throw new NotFoundException(`Roomtype with id ${command.id} not found`);
        }

        const flag = await this.roomtypeRepository.delete(command.id);
        if (flag)
            return `Roomtype with id ${command.id} deleted successfully`;
        else
            throw new InternalServerErrorException(`Roomtype with id ${command.id} could not be deleted`);
    }
}
