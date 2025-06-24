import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { CreatePromotionCommand } from "../ports/incoming";
import { TPromotionRepository } from "../ports/outgoing/promotion.repository";
import { PromotionResponseDto } from "src/promotion/presentation/http/dto";
import { PromotionMapper } from "../mappers";

@CommandHandler(CreatePromotionCommand)
export class CreatePromotionUseCase implements ICommandHandler<CreatePromotionCommand> {
  constructor(
    private readonly promotionRepository: TPromotionRepository,
  ) { }

  async execute(command: CreatePromotionCommand): Promise<PromotionResponseDto> {
    const createdPromotion = await this.promotionRepository.create(PromotionMapper.createCommandToDomain(command));
    return PromotionMapper.toResponseDto(createdPromotion);
  }
}
