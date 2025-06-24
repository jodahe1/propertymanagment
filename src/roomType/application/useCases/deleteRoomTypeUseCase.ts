import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { DeleteRoomTypeCommand } from "../ports/incoming";
import { TRoomTypeRepository } from "../ports/outgoing/roomType.repository";
import { InternalServerErrorException, NotFoundException } from "@nestjs/common";

@CommandHandler(DeleteRoomTypeCommand)
export class DeleteRoomTypeUseCase implements ICommandHandler<DeleteRoomTypeCommand> {
    constructor(
        private readonly roomTypeRepository: TRoomTypeRepository,
    ) { }

    async execute(command: DeleteRoomTypeCommand): Promise<string> {
        const roomType = await this.roomTypeRepository.findById(command.id);
        if (!roomType) {
            throw new NotFoundException(`RoomType with id ${command.id} not found`);
        }

        const flag = await this.roomTypeRepository.delete(command.id);
        if (flag)
            return `RoomType with id ${command.id} deleted successfully`;
        else
            throw new InternalServerErrorException(`RoomType with id ${command.id} could not be deleted`);
    }
}
