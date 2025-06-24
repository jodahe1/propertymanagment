import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { ReviewPersistenceEntity } from './persistence-entities/review.persistence.entity';
import { TReviewRepository } from 'src/review/application/ports/outgoing/review.repository';
import { ReviewRepository } from './repositories/review.repository';


@Module({
  imports: [
    MikroOrmModule.forFeature([ReviewPersistenceEntity]),
  ],
  providers: [
    {
      provide: TReviewRepository,
      useClass: ReviewRepository,
    },
  ],
  exports: [TReviewRepository],
})
export class MikroOrmPersistenceModule {}
