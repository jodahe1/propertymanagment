import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetReviewByIdQuery } from "../ports/incoming";
import { TReviewRepository } from "../ports/outgoing/review.repository";
import { ReviewResponseDto } from "src/review/presentation/http/dto";
import { ReviewMapper } from "../mappers";
import { NotFoundException } from "@nestjs/common";
import { QueryOptions } from "@shared/shared-kernel";

@QueryHandler(GetReviewByIdQuery)
export class GetReviewByIdUseCase implements IQueryHandler<GetReviewByIdQuery> {
    constructor(
        private readonly repository: TReviewRepository,
    ) { }

    async execute(query: GetReviewByIdQuery): Promise<ReviewResponseDto | null> {
        const review = await this.repository.findById(query.id);
        if (!review) {
            throw new NotFoundException(`Review with id ${query.id} not found`);
        }
        return ReviewMapper.toResponseDto(review);
    }
}
