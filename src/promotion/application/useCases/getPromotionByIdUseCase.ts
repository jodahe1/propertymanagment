import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetPromotionByIdQuery } from "../ports/incoming";
import { TPromotionRepository } from "../ports/outgoing/promotion.repository";
import { PromotionResponseDto } from "src/promotion/presentation/http/dto";
import { PromotionMapper } from "../mappers";
import { NotFoundException } from "@nestjs/common";
import { QueryOptions } from "@shared/shared-kernel";

@QueryHandler(GetPromotionByIdQuery)
export class GetPromotionByIdUseCase implements IQueryHandler<GetPromotionByIdQuery> {
    constructor(
        private readonly repository: TPromotionRepository,
    ) { }

    async execute(query: GetPromotionByIdQuery): Promise<PromotionResponseDto | null> {
        const promotion = await this.repository.findById(query.id);
        if (!promotion) {
            throw new NotFoundException(`Promotion with id ${query.id} not found`);
        }
        return PromotionMapper.toResponseDto(promotion);
    }
}
