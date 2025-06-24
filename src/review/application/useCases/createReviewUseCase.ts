import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { CreateReviewCommand } from "../ports/incoming";
import { TReviewRepository } from "../ports/outgoing/review.repository";
import { ReviewResponseDto } from "src/review/presentation/http/dto";
import { ReviewMapper } from "../mappers";

@CommandHandler(CreateReviewCommand)
export class CreateReviewUseCase implements ICommandHandler<CreateReviewCommand> {
  constructor(
    private readonly reviewRepository: TReviewRepository,
  ) { }

  async execute(command: CreateReviewCommand): Promise<ReviewResponseDto> {
    const createdReview = await this.reviewRepository.create(ReviewMapper.createCommandToDomain(command));
    return ReviewMapper.toResponseDto(createdReview);
  }
}
