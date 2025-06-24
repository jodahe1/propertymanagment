import { Provider } from "@nestjs/common";
import { CreatePromotionUseCase } from "./createPromotionUseCase";
import { GetAllPromotionsUseCase } from "./getAllPromotionsUseCase";
import { GetPromotionByIdUseCase } from "./getPromotionByIdUseCase";
import { DeletePromotionUseCase } from "./deletePromotionUseCase";
import { UpdatePromotionUseCase } from "./updatePromotionUseCase";

export const PromotionUseCases: Provider[] = [CreatePromotionUseCase, GetAllPromotionsUseCase, GetPromotionByIdUseCase, DeletePromotionUseCase, UpdatePromotionUseCase];
