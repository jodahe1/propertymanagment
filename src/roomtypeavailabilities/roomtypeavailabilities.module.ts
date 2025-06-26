import { CqrsModule } from '@nestjs/cqrs';
import { RoomtypeavailabilitiesUseCases } from './application/useCases';
import { RoomtypeavailabilitiesController } from './presentation/http/roomtypeavailabilities.controller';
import { Module } from '@nestjs/common';
import { RoomtypeavailabilitiesInfrastructureModule } from './infrastructure/roomtypeavailabilities-infrastructure.module';

@Module({
    imports: [
        CqrsModule,
        RoomtypeavailabilitiesInfrastructureModule.register({
            storage_driver: 'orm', // 'orm' | 'in-memory'
        }),
    ],
    controllers: [RoomtypeavailabilitiesController],
    providers: [...RoomtypeavailabilitiesUseCases],
})
export class RoomtypeavailabilitiesModule {}
