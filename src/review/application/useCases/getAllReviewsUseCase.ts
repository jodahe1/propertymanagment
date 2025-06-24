import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { TReviewRepository } from "../ports/outgoing/review.repository";
import { GetAllReviewsQuery } from "../ports/incoming";
import { ReviewMapper } from "../mappers";
import { ReviewResponseDto } from "src/review/presentation/http/dto";
import { PaginatedResponseDto } from "@shared/shared-kernel";

@QueryHandler(GetAllReviewsQuery)
export class GetAllReviewsUseCase implements IQueryHandler<GetAllReviewsQuery> {
    constructor(
        private readonly repository: TReviewRepository,
    ) { }

    async execute(query: GetAllReviewsQuery): Promise<PaginatedResponseDto<ReviewResponseDto>> {
        const reviews = await this.repository.findPaginated(query.queryOptions);
        return ReviewMapper.toPaginatedResponseDto(reviews);
    }
}
