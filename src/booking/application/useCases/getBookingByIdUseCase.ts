import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetBookingByIdQuery } from "../ports/incoming";
import { TBookingRepository } from "../ports/outgoing/booking.repository";
import { BookingResponseDto } from "src/booking/presentation/http/dto";
import { BookingMapper } from "../mappers";
import { NotFoundException } from "@nestjs/common";
import { QueryOptions } from "@shared/shared-kernel";

@QueryHandler(GetBookingByIdQuery)
export class GetBookingByIdUseCase implements IQueryHandler<GetBookingByIdQuery> {
    constructor(
        private readonly repository: TBookingRepository,
    ) { }

    async execute(query: GetBookingByIdQuery): Promise<BookingResponseDto | null> {
        const booking = await this.repository.findById(query.id);
        if (!booking) {
            throw new NotFoundException(`Booking with id ${query.id} not found`);
        }
        return BookingMapper.toResponseDto(booking);
    }
}
