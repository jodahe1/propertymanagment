import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { CreateHotelCommand } from "../ports/incoming";
import { THotelRepository } from "../ports/outgoing/hotel.repository";
import { HotelResponseDto } from "src/hotel/presentation/http/dto";
import { HotelMapper } from "../mappers";

@CommandHandler(CreateHotelCommand)
export class CreateHotelUseCase implements ICommandHandler<CreateHotelCommand> {
  constructor(
    private readonly hotelRepository: THotelRepository,
  ) { }

  async execute(command: CreateHotelCommand): Promise<HotelResponseDto> {
    const createdHotel = await this.hotelRepository.create(HotelMapper.createCommandToDomain(command));
    return HotelMapper.toResponseDto(createdHotel);
  }
}
