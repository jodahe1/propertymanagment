import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { UpdatePromotionCommand } from "../ports/incoming";
import { TPromotionRepository } from "../ports/outgoing/promotion.repository";
import { PromotionResponseDto } from "src/promotion/presentation/http/dto";
import { PromotionMapper } from "../mappers";
import { NotFoundException } from "@nestjs/common";

@CommandHandler(UpdatePromotionCommand)
export class UpdatePromotionUseCase implements ICommandHandler<UpdatePromotionCommand> {
    constructor(
        private readonly promotionRepository: TPromotionRepository,
    ) { }
    
    async execute(command: UpdatePromotionCommand): Promise<PromotionResponseDto> {
        const promotion = await this.promotionRepository.findById(command.id);
        if (!promotion) {
            throw new NotFoundException(`Promotion with id ${command.id} not found`);
        }
          const updatedPromotion = await this.promotionRepository.update(command.id, PromotionMapper.updateCommandToDomain(command, promotion));
        return PromotionMapper.toResponseDto(updatedPromotion);
    }
}
