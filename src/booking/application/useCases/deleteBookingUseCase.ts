import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { DeleteBookingCommand } from "../ports/incoming";
import { TBookingRepository } from "../ports/outgoing/booking.repository";
import { InternalServerErrorException, NotFoundException } from "@nestjs/common";

@CommandHandler(DeleteBookingCommand)
export class DeleteBookingUseCase implements ICommandHandler<DeleteBookingCommand> {
    constructor(
        private readonly bookingRepository: TBookingRepository,
    ) { }

    async execute(command: DeleteBookingCommand): Promise<string> {
        const booking = await this.bookingRepository.findById(command.id);
        if (!booking) {
            throw new NotFoundException(`Booking with id ${command.id} not found`);
        }

        const flag = await this.bookingRepository.delete(command.id);
        if (flag)
            return `Booking with id ${command.id} deleted successfully`;
        else
            throw new InternalServerErrorException(`Booking with id ${command.id} could not be deleted`);
    }
}
