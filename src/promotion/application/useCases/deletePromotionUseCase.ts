import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { DeletePromotionCommand } from "../ports/incoming";
import { TPromotionRepository } from "../ports/outgoing/promotion.repository";
import { InternalServerErrorException, NotFoundException } from "@nestjs/common";

@CommandHandler(DeletePromotionCommand)
export class DeletePromotionUseCase implements ICommandHandler<DeletePromotionCommand> {
    constructor(
        private readonly promotionRepository: TPromotionRepository,
    ) { }

    async execute(command: DeletePromotionCommand): Promise<string> {
        const promotion = await this.promotionRepository.findById(command.id);
        if (!promotion) {
            throw new NotFoundException(`Promotion with id ${command.id} not found`);
        }

        const flag = await this.promotionRepository.delete(command.id);
        if (flag)
            return `Promotion with id ${command.id} deleted successfully`;
        else
            throw new InternalServerErrorException(`Promotion with id ${command.id} could not be deleted`);
    }
}
