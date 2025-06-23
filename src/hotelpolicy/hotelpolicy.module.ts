import { CqrsModule } from '@nestjs/cqrs';
import { HotelpolicyUseCases } from './application/useCases';
import { HotelpolicyController } from './presentation/http/hotelpolicy.controller';
import { Module } from '@nestjs/common';
import { HotelpolicyInfrastructureModule } from './infrastructure/hotelpolicy-infrastructure.module';

@Module({
    imports: [
        CqrsModule,
        HotelpolicyInfrastructureModule.register({
            storage_driver: 'orm', // 'orm' | 'in-memory'
        }),
    ],
    controllers: [HotelpolicyController],
    providers: [...HotelpolicyUseCases],
})
export class HotelpolicyModule {}
