import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { TGuestRepository } from "../ports/outgoing/guest.repository";
import { GetAllGuestsQuery } from "../ports/incoming";
import { GuestMapper } from "../mappers";
import { GuestResponseDto } from "src/guest/presentation/http/dto";
import { PaginatedResponseDto } from "@shared/shared-kernel";

@QueryHandler(GetAllGuestsQuery)
export class GetAllGuestsUseCase implements IQueryHandler<GetAllGuestsQuery> {
    constructor(
        private readonly repository: TGuestRepository,
    ) { }

    async execute(query: GetAllGuestsQuery): Promise<PaginatedResponseDto<GuestResponseDto>> {
        const guests = await this.repository.findPaginated(query.queryOptions);
        return GuestMapper.toPaginatedResponseDto(guests);
    }
}
