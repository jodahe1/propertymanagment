import { Promotion } from 'src/promotion/domain/entities';
import { BaseRepository } from "@shared/shared-kernel";

export abstract class TPromotionRepository extends BaseRepository<Promotion> {
}
