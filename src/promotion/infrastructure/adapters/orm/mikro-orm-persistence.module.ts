import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { PromotionPersistenceEntity } from './persistence-entities/promotion.persistence.entity';
import { TPromotionRepository } from 'src/promotion/application/ports/outgoing/promotion.repository';
import { PromotionRepository } from './repositories/promotion.repository';


@Module({
  imports: [
    MikroOrmModule.forFeature([PromotionPersistenceEntity]),
  ],
  providers: [
    {
      provide: TPromotionRepository,
      useClass: PromotionRepository,
    },
  ],
  exports: [TPromotionRepository],
})
export class MikroOrmPersistenceModule {}
