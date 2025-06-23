import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { CreateBookingCommand } from "../ports/incoming";
import { TBookingRepository } from "../ports/outgoing/booking.repository";
import { BookingResponseDto } from "src/booking/presentation/http/dto";
import { BookingMapper } from "../mappers";

@CommandHandler(CreateBookingCommand)
export class CreateBookingUseCase implements ICommandHandler<CreateBookingCommand> {
  constructor(
    private readonly bookingRepository: TBookingRepository,
  ) { }

  async execute(command: CreateBookingCommand): Promise<BookingResponseDto> {
    const createdBooking = await this.bookingRepository.create(BookingMapper.createCommandToDomain(command));
    return BookingMapper.toResponseDto(createdBooking);
  }
}
