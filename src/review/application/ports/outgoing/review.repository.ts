import { Review } from 'src/review/domain/entities';
import { BaseRepository } from "@shared/shared-kernel";

export abstract class TReviewRepository extends BaseRepository<Review> {
}
