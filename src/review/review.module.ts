import { CqrsModule } from '@nestjs/cqrs';
import { ReviewUseCases } from './application/useCases';
import { ReviewController } from './presentation/http/review.controller';
import { Module } from '@nestjs/common';
import { ReviewInfrastructureModule } from './infrastructure/review-infrastructure.module';

@Module({
    imports: [
        CqrsModule,
        ReviewInfrastructureModule.register({
            storage_driver: 'orm', // 'orm' | 'in-memory'
        }),
    ],
    controllers: [ReviewController],
    providers: [...ReviewUseCases],
})
export class ReviewModule {}
