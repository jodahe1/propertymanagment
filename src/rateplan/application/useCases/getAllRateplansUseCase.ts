import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { TRateplanRepository } from "../ports/outgoing/rateplan.repository";
import { GetAllRateplansQuery } from "../ports/incoming";
import { RateplanMapper } from "../mappers";
import { RateplanResponseDto } from "src/rateplan/presentation/http/dto";
import { PaginatedResponseDto } from "@shared/shared-kernel";

@QueryHandler(GetAllRateplansQuery)
export class GetAllRateplansUseCase implements IQueryHandler<GetAllRateplansQuery> {
    constructor(
        private readonly repository: TRateplanRepository,
    ) { }

    async execute(query: GetAllRateplansQuery): Promise<PaginatedResponseDto<RateplanResponseDto>> {
        const rateplans = await this.repository.findPaginated(query.queryOptions);
        return RateplanMapper.toPaginatedResponseDto(rateplans);
    }
}
