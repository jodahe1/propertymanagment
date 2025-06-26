import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { UpdateRoomtypeavailabilitiesCommand } from "../ports/incoming";
import { TRoomtypeavailabilitiesRepository } from "../ports/outgoing/roomtypeavailabilities.repository";
import { RoomtypeavailabilitiesResponseDto } from "src/roomtypeavailabilities/presentation/http/dto";
import { RoomtypeavailabilitiesMapper } from "../mappers";
import { NotFoundException } from "@nestjs/common";

@CommandHandler(UpdateRoomtypeavailabilitiesCommand)
export class UpdateRoomtypeavailabilitiesUseCase implements ICommandHandler<UpdateRoomtypeavailabilitiesCommand> {
    constructor(
        private readonly roomtypeavailabilitiesRepository: TRoomtypeavailabilitiesRepository,
    ) { }
    
    async execute(command: UpdateRoomtypeavailabilitiesCommand): Promise<RoomtypeavailabilitiesResponseDto> {
        const roomtypeavailabilities = await this.roomtypeavailabilitiesRepository.findById(command.id);
        if (!roomtypeavailabilities) {
            throw new NotFoundException(`Roomtypeavailabilities with id ${command.id} not found`);
        }
          const updatedRoomtypeavailabilities = await this.roomtypeavailabilitiesRepository.update(command.id, RoomtypeavailabilitiesMapper.updateCommandToDomain(command, roomtypeavailabilities));
        return RoomtypeavailabilitiesMapper.toResponseDto(updatedRoomtypeavailabilities);
    }
}
