import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { CreateRoomtypeavailabilitiesCommand } from "../ports/incoming";
import { TRoomtypeavailabilitiesRepository } from "../ports/outgoing/roomtypeavailabilities.repository";
import { RoomtypeavailabilitiesResponseDto } from "src/roomtypeavailabilities/presentation/http/dto";
import { RoomtypeavailabilitiesMapper } from "../mappers";

@CommandHandler(CreateRoomtypeavailabilitiesCommand)
export class CreateRoomtypeavailabilitiesUseCase implements ICommandHandler<CreateRoomtypeavailabilitiesCommand> {
  constructor(
    private readonly roomtypeavailabilitiesRepository: TRoomtypeavailabilitiesRepository,
  ) { }

  async execute(command: CreateRoomtypeavailabilitiesCommand): Promise<RoomtypeavailabilitiesResponseDto> {
    const createdRoomtypeavailabilities = await this.roomtypeavailabilitiesRepository.create(RoomtypeavailabilitiesMapper.createCommandToDomain(command));
    return RoomtypeavailabilitiesMapper.toResponseDto(createdRoomtypeavailabilities);
  }
}
