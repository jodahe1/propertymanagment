import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { UpdateBookingCommand } from "../ports/incoming";
import { TBookingRepository } from "../ports/outgoing/booking.repository";
import { BookingResponseDto } from "src/booking/presentation/http/dto";
import { BookingMapper } from "../mappers";
import { NotFoundException } from "@nestjs/common";

@CommandHandler(UpdateBookingCommand)
export class UpdateBookingUseCase implements ICommandHandler<UpdateBookingCommand> {
    constructor(
        private readonly bookingRepository: TBookingRepository,
    ) { }
    
    async execute(command: UpdateBookingCommand): Promise<BookingResponseDto> {
        const booking = await this.bookingRepository.findById(command.id);
        if (!booking) {
            throw new NotFoundException(`Booking with id ${command.id} not found`);
        }
          const updatedBooking = await this.bookingRepository.update(command.id, BookingMapper.updateCommandToDomain(command, booking));
        return BookingMapper.toResponseDto(updatedBooking);
    }
}
