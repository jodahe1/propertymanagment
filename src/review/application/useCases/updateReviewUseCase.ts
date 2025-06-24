import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { UpdateReviewCommand } from "../ports/incoming";
import { TReviewRepository } from "../ports/outgoing/review.repository";
import { ReviewResponseDto } from "src/review/presentation/http/dto";
import { ReviewMapper } from "../mappers";
import { NotFoundException } from "@nestjs/common";

@CommandHandler(UpdateReviewCommand)
export class UpdateReviewUseCase implements ICommandHandler<UpdateReviewCommand> {
    constructor(
        private readonly reviewRepository: TReviewRepository,
    ) { }
    
    async execute(command: UpdateReviewCommand): Promise<ReviewResponseDto> {
        const review = await this.reviewRepository.findById(command.id);
        if (!review) {
            throw new NotFoundException(`Review with id ${command.id} not found`);
        }
          const updatedReview = await this.reviewRepository.update(command.id, ReviewMapper.updateCommandToDomain(command, review));
        return ReviewMapper.toResponseDto(updatedReview);
    }
}
