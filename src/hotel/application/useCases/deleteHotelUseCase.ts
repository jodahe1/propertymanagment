import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { DeleteHotelCommand } from "../ports/incoming";
import { THotelRepository } from "../ports/outgoing/hotel.repository";
import { InternalServerErrorException, NotFoundException } from "@nestjs/common";

@CommandHandler(DeleteHotelCommand)
export class DeleteHotelUseCase implements ICommandHandler<DeleteHotelCommand> {
    constructor(
        private readonly hotelRepository: THotelRepository,
    ) { }

    async execute(command: DeleteHotelCommand): Promise<string> {
        const hotel = await this.hotelRepository.findById(command.id);
        if (!hotel) {
            throw new NotFoundException(`Hotel with id ${command.id} not found`);
        }

        const flag = await this.hotelRepository.delete(command.id);
        if (flag)
            return `Hotel with id ${command.id} deleted successfully`;
        else
            throw new InternalServerErrorException(`Hotel with id ${command.id} could not be deleted`);
    }
}
