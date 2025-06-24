import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { UpdateRoomCommand } from "../ports/incoming";
import { TRoomRepository } from "../ports/outgoing/room.repository";
import { RoomResponseDto } from "src/room/presentation/http/dto";
import { RoomMapper } from "../mappers";
import { NotFoundException } from "@nestjs/common";

@CommandHandler(UpdateRoomCommand)
export class UpdateRoomUseCase implements ICommandHandler<UpdateRoomCommand> {
    constructor(
        private readonly roomRepository: TRoomRepository,
    ) { }
    
    async execute(command: UpdateRoomCommand): Promise<RoomResponseDto> {
        const room = await this.roomRepository.findById(command.id);
        if (!room) {
            throw new NotFoundException(`Room with id ${command.id} not found`);
        }
          const updatedRoom = await this.roomRepository.update(command.id, RoomMapper.updateCommandToDomain(command, room));
        return RoomMapper.toResponseDto(updatedRoom);
    }
}
