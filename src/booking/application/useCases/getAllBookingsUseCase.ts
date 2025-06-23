import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { TBookingRepository } from "../ports/outgoing/booking.repository";
import { GetAllBookingsQuery } from "../ports/incoming";
import { BookingMapper } from "../mappers";
import { BookingResponseDto } from "src/booking/presentation/http/dto";
import { PaginatedResponseDto } from "@shared/shared-kernel";

@QueryHandler(GetAllBookingsQuery)
export class GetAllBookingsUseCase implements IQueryHandler<GetAllBookingsQuery> {
    constructor(
        private readonly repository: TBookingRepository,
    ) { }

    async execute(query: GetAllBookingsQuery): Promise<PaginatedResponseDto<BookingResponseDto>> {
        const bookings = await this.repository.findPaginated(query.queryOptions);
        return BookingMapper.toPaginatedResponseDto(bookings);
    }
}
