import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { UpdateRoomtypeCommand } from "../ports/incoming";
import { TRoomtypeRepository } from "../ports/outgoing/roomtype.repository";
import { RoomtypeResponseDto } from "src/roomtype/presentation/http/dto";
import { RoomtypeMapper } from "../mappers";
import { NotFoundException } from "@nestjs/common";

@CommandHandler(UpdateRoomtypeCommand)
export class UpdateRoomtypeUseCase implements ICommandHandler<UpdateRoomtypeCommand> {
    constructor(
        private readonly roomtypeRepository: TRoomtypeRepository,
    ) { }
    
    async execute(command: UpdateRoomtypeCommand): Promise<RoomtypeResponseDto> {
        const roomtype = await this.roomtypeRepository.findById(command.id);
        if (!roomtype) {
            throw new NotFoundException(`Roomtype with id ${command.id} not found`);
        }
          const updatedRoomtype = await this.roomtypeRepository.update(command.id, RoomtypeMapper.updateCommandToDomain(command, roomtype));
        return RoomtypeMapper.toResponseDto(updatedRoomtype);
    }
}
