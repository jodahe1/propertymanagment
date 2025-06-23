import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetHotelByIdQuery } from "../ports/incoming";
import { THotelRepository } from "../ports/outgoing/hotel.repository";
import { HotelResponseDto } from "src/hotel/presentation/http/dto";
import { HotelMapper } from "../mappers";
import { NotFoundException } from "@nestjs/common";
import { QueryOptions } from "@shared/shared-kernel";

@QueryHandler(GetHotelByIdQuery)
export class GetHotelByIdUseCase implements IQueryHandler<GetHotelByIdQuery> {
    constructor(
        private readonly repository: THotelRepository,
    ) { }

    async execute(query: GetHotelByIdQuery): Promise<HotelResponseDto | null> {
        const hotel = await this.repository.findById(query.id);
        if (!hotel) {
            throw new NotFoundException(`Hotel with id ${query.id} not found`);
        }
        return HotelMapper.toResponseDto(hotel);
    }
}
