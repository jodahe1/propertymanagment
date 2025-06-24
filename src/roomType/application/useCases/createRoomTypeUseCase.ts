import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { CreateRoomTypeCommand } from "../ports/incoming";
import { TRoomTypeRepository } from "../ports/outgoing/roomType.repository";
import { RoomTypeResponseDto } from "src/roomType/presentation/http/dto";
import { RoomTypeMapper } from "../mappers";

@CommandHandler(CreateRoomTypeCommand)
export class CreateRoomTypeUseCase implements ICommandHandler<CreateRoomTypeCommand> {
  constructor(
    private readonly roomTypeRepository: TRoomTypeRepository,
  ) { }

  async execute(command: CreateRoomTypeCommand): Promise<RoomTypeResponseDto> {
    const createdRoomType = await this.roomTypeRepository.create(RoomTypeMapper.createCommandToDomain(command));
    return RoomTypeMapper.toResponseDto(createdRoomType);
  }
}
