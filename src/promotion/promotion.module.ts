import { CqrsModule } from '@nestjs/cqrs';
import { PromotionUseCases } from './application/useCases';
import { PromotionController } from './presentation/http/promotion.controller';
import { Module } from '@nestjs/common';
import { PromotionInfrastructureModule } from './infrastructure/promotion-infrastructure.module';

@Module({
    imports: [
        CqrsModule,
        PromotionInfrastructureModule.register({
            storage_driver: 'orm', // 'orm' | 'in-memory'
        }),
    ],
    controllers: [PromotionController],
    providers: [...PromotionUseCases],
})
export class PromotionModule {}
