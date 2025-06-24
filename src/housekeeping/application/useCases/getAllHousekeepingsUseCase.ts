import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { THousekeepingRepository } from "../ports/outgoing/housekeeping.repository";
import { GetAllHousekeepingsQuery } from "../ports/incoming";
import { HousekeepingMapper } from "../mappers";
import { HousekeepingResponseDto } from "src/housekeeping/presentation/http/dto";
import { PaginatedResponseDto } from "@shared/shared-kernel";

@QueryHandler(GetAllHousekeepingsQuery)
export class GetAllHousekeepingsUseCase implements IQueryHandler<GetAllHousekeepingsQuery> {
    constructor(
        private readonly repository: THousekeepingRepository,
    ) { }

    async execute(query: GetAllHousekeepingsQuery): Promise<PaginatedResponseDto<HousekeepingResponseDto>> {
        const housekeepings = await this.repository.findPaginated(query.queryOptions);
        return HousekeepingMapper.toPaginatedResponseDto(housekeepings);
    }
}
