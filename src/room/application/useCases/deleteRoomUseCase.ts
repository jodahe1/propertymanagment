import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { DeleteRoomCommand } from "../ports/incoming";
import { TRoomRepository } from "../ports/outgoing/room.repository";
import { InternalServerErrorException, NotFoundException } from "@nestjs/common";

@CommandHandler(DeleteRoomCommand)
export class DeleteRoomUseCase implements ICommandHandler<DeleteRoomCommand> {
    constructor(
        private readonly roomRepository: TRoomRepository,
    ) { }

    async execute(command: DeleteRoomCommand): Promise<string> {
        const room = await this.roomRepository.findById(command.id);
        if (!room) {
            throw new NotFoundException(`Room with id ${command.id} not found`);
        }

        const flag = await this.roomRepository.delete(command.id);
        if (flag)
            return `Room with id ${command.id} deleted successfully`;
        else
            throw new InternalServerErrorException(`Room with id ${command.id} could not be deleted`);
    }
}
