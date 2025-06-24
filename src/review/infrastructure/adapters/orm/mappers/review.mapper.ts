import { Review } from 'src/review/domain/entities';
import { ReviewPersistenceEntity } from '../persistence-entities/review.persistence.entity';
import { EntityManager } from '@mikro-orm/core';

export class ReviewPersistenceMapper {
    static toDomain(entity: ReviewPersistenceEntity): Review {
        return new Review(
            entity.hotelId,
            entity.guestId,
            entity.rating,
            entity.comment,
            entity.id,
        );
    }

    static toEntity(domain: Review, em: EntityManager): ReviewPersistenceEntity {
        const entity = new ReviewPersistenceEntity();
        entity.id = domain.id;
        entity.hotelId = domain.hotelId;
        entity.guestId = domain.guestId;
        entity.rating = domain.rating;
        entity.comment = domain.comment;
        return entity;
    }
}
