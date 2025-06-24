import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { CreateRoomCommand } from "../ports/incoming";
import { TRoomRepository } from "../ports/outgoing/room.repository";
import { RoomResponseDto } from "src/room/presentation/http/dto";
import { RoomMapper } from "../mappers";

@CommandHandler(CreateRoomCommand)
export class CreateRoomUseCase implements ICommandHandler<CreateRoomCommand> {
  constructor(
    private readonly roomRepository: TRoomRepository,
  ) { }

  async execute(command: CreateRoomCommand): Promise<RoomResponseDto> {
    const createdRoom = await this.roomRepository.create(RoomMapper.createCommandToDomain(command));
    return RoomMapper.toResponseDto(createdRoom);
  }
}
