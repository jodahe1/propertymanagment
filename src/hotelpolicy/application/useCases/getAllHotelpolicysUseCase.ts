import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { THotelpolicyRepository } from "../ports/outgoing/hotelpolicy.repository";
import { GetAllHotelpolicysQuery } from "../ports/incoming";
import { HotelpolicyMapper } from "../mappers";
import { HotelpolicyResponseDto } from "src/hotelpolicy/presentation/http/dto";
import { PaginatedResponseDto } from "@shared/shared-kernel";

@QueryHandler(GetAllHotelpolicysQuery)
export class GetAllHotelpolicysUseCase implements IQueryHandler<GetAllHotelpolicysQuery> {
    constructor(
        private readonly repository: THotelpolicyRepository,
    ) { }

    async execute(query: GetAllHotelpolicysQuery): Promise<PaginatedResponseDto<HotelpolicyResponseDto>> {
        const hotelpolicys = await this.repository.findPaginated(query.queryOptions);
        return HotelpolicyMapper.toPaginatedResponseDto(hotelpolicys);
    }
}
