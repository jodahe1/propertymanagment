import { CqrsModule } from '@nestjs/cqrs';
import { RateplanUseCases } from './application/useCases';
import { RateplanController } from './presentation/http/rateplan.controller';
import { Module } from '@nestjs/common';
import { RateplanInfrastructureModule } from './infrastructure/rateplan-infrastructure.module';

@Module({
    imports: [
        CqrsModule,
        RateplanInfrastructureModule.register({
            storage_driver: 'orm', // 'orm' | 'in-memory'
        }),
    ],
    controllers: [RateplanController],
    providers: [...RateplanUseCases],
})
export class RateplanModule {}
