import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { DeleteReviewCommand } from "../ports/incoming";
import { TReviewRepository } from "../ports/outgoing/review.repository";
import { InternalServerErrorException, NotFoundException } from "@nestjs/common";

@CommandHandler(DeleteReviewCommand)
export class DeleteReviewUseCase implements ICommandHandler<DeleteReviewCommand> {
    constructor(
        private readonly reviewRepository: TReviewRepository,
    ) { }

    async execute(command: DeleteReviewCommand): Promise<string> {
        const review = await this.reviewRepository.findById(command.id);
        if (!review) {
            throw new NotFoundException(`Review with id ${command.id} not found`);
        }

        const flag = await this.reviewRepository.delete(command.id);
        if (flag)
            return `Review with id ${command.id} deleted successfully`;
        else
            throw new InternalServerErrorException(`Review with id ${command.id} could not be deleted`);
    }
}
