import { EntityManager, EntityRepository } from "@mikro-orm/core";
import { InjectRepository } from "@mikro-orm/nestjs";
import { Injectable } from "@nestjs/common";
import { MikroOrmBaseRepository } from "@shared/shared-kernel";
import { TReviewRepository } from "src/review/application/ports/outgoing/review.repository";
import { Review } from "src/review/domain/entities";
import { ReviewPersistenceMapper } from "../mappers/review.mapper";
import { ReviewPersistenceEntity } from "../persistence-entities/review.persistence.entity";

@Injectable()
export class ReviewRepository extends MikroOrmBaseRepository<Review> implements TReviewRepository {
    constructor(
        @InjectRepository(ReviewPersistenceEntity)
        private readonly repo: EntityRepository<ReviewPersistenceEntity>,
        private readonly entityManager: EntityManager,
    ) {
        super(repo, entityManager);
    }

    protected toDomain(entity: ReviewPersistenceEntity): Review {
        return ReviewPersistenceMapper.toDomain(entity);
    }
    protected toEntity(domain: Review): ReviewPersistenceEntity {
        return ReviewPersistenceMapper.toEntity(domain, this.entityManager);
    }
    protected updateEntity(entity: ReviewPersistenceEntity, updates: Review): void {
        if (updates.hotelId) entity.hotelId = updates.hotelId;
        if (updates.guestId) entity.guestId = updates.guestId;
        if (updates.rating) entity.rating = updates.rating;
        if (updates.comment !== undefined) entity.comment = updates.comment;
    }
}
