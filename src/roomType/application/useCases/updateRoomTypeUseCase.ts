import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { UpdateRoomTypeCommand } from "../ports/incoming";
import { TRoomTypeRepository } from "../ports/outgoing/roomType.repository";
import { RoomTypeResponseDto } from "src/roomType/presentation/http/dto";
import { RoomTypeMapper } from "../mappers";
import { NotFoundException } from "@nestjs/common";

@CommandHandler(UpdateRoomTypeCommand)
export class UpdateRoomTypeUseCase implements ICommandHandler<UpdateRoomTypeCommand> {
    constructor(
        private readonly roomTypeRepository: TRoomTypeRepository,
    ) { }
    
    async execute(command: UpdateRoomTypeCommand): Promise<RoomTypeResponseDto> {
        const roomType = await this.roomTypeRepository.findById(command.id);
        if (!roomType) {
            throw new NotFoundException(`RoomType with id ${command.id} not found`);
        }
          const updatedRoomType = await this.roomTypeRepository.update(command.id, RoomTypeMapper.updateCommandToDomain(command, roomType));
        return RoomTypeMapper.toResponseDto(updatedRoomType);
    }
}
