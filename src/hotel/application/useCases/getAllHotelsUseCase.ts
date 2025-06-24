import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { THotelRepository } from "../ports/outgoing/hotel.repository";
import { GetAllHotelsQuery } from "../ports/incoming";
import { HotelMapper } from "../mappers";
import { HotelResponseDto } from "src/hotel/presentation/http/dto";
import { PaginatedResponseDto } from "@shared/shared-kernel";

@QueryHandler(GetAllHotelsQuery)
export class GetAllHotelsUseCase implements IQueryHandler<GetAllHotelsQuery> {
    constructor(
        private readonly repository: THotelRepository,
    ) { }

    async execute(query: GetAllHotelsQuery): Promise<PaginatedResponseDto<HotelResponseDto>> {
        const hotels = await this.repository.findPaginated(query.queryOptions);
        return HotelMapper.toPaginatedResponseDto(hotels);
    }
}
