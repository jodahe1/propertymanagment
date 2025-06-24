import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { TPromotionRepository } from "../ports/outgoing/promotion.repository";
import { GetAllPromotionsQuery } from "../ports/incoming";
import { PromotionMapper } from "../mappers";
import { PromotionResponseDto } from "src/promotion/presentation/http/dto";
import { PaginatedResponseDto } from "@shared/shared-kernel";

@QueryHandler(GetAllPromotionsQuery)
export class GetAllPromotionsUseCase implements IQueryHandler<GetAllPromotionsQuery> {
    constructor(
        private readonly repository: TPromotionRepository,
    ) { }

    async execute(query: GetAllPromotionsQuery): Promise<PaginatedResponseDto<PromotionResponseDto>> {
        const promotions = await this.repository.findPaginated(query.queryOptions);
        return PromotionMapper.toPaginatedResponseDto(promotions);
    }
}
