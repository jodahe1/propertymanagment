import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { UpdateHotelCommand } from "../ports/incoming";
import { THotelRepository } from "../ports/outgoing/hotel.repository";
import { HotelResponseDto } from "src/hotel/presentation/http/dto";
import { HotelMapper } from "../mappers";
import { NotFoundException } from "@nestjs/common";

@CommandHandler(UpdateHotelCommand)
export class UpdateHotelUseCase implements ICommandHandler<UpdateHotelCommand> {
    constructor(
        private readonly hotelRepository: THotelRepository,
    ) { }
    
    async execute(command: UpdateHotelCommand): Promise<HotelResponseDto> {
        const hotel = await this.hotelRepository.findById(command.id);
        if (!hotel) {
            throw new NotFoundException(`Hotel with id ${command.id} not found`);
        }
          const updatedHotel = await this.hotelRepository.update(command.id, HotelMapper.updateCommandToDomain(command, hotel));
        return HotelMapper.toResponseDto(updatedHotel);
    }
}
