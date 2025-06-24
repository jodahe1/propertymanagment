import { CqrsModule } from '@nestjs/cqrs';
import { HousekeepingUseCases } from './application/useCases';
import { HousekeepingController } from './presentation/http/housekeeping.controller';
import { Module } from '@nestjs/common';
import { HousekeepingInfrastructureModule } from './infrastructure/housekeeping-infrastructure.module';

@Module({
    imports: [
        CqrsModule,
        HousekeepingInfrastructureModule.register({
            storage_driver: 'orm', // 'orm' | 'in-memory'
        }),
    ],
    controllers: [HousekeepingController],
    providers: [...HousekeepingUseCases],
})
export class HousekeepingModule {}
