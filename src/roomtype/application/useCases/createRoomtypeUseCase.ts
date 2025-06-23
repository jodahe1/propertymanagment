import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { CreateRoomtypeCommand } from "../ports/incoming";
import { TRoomtypeRepository } from "../ports/outgoing/roomtype.repository";
import { RoomtypeResponseDto } from "src/roomtype/presentation/http/dto";
import { RoomtypeMapper } from "../mappers";

@CommandHandler(CreateRoomtypeCommand)
export class CreateRoomtypeUseCase implements ICommandHandler<CreateRoomtypeCommand> {
  constructor(
    private readonly roomtypeRepository: TRoomtypeRepository,
  ) { }

  async execute(command: CreateRoomtypeCommand): Promise<RoomtypeResponseDto> {
    const createdRoomtype = await this.roomtypeRepository.create(RoomtypeMapper.createCommandToDomain(command));
    return RoomtypeMapper.toResponseDto(createdRoomtype);
  }
}
