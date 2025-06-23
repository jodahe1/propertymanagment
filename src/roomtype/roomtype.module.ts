import { CqrsModule } from '@nestjs/cqrs';
import { RoomtypeUseCases } from './application/useCases';
import { RoomtypeController } from './presentation/http/roomtype.controller';
import { Module } from '@nestjs/common';
import { RoomtypeInfrastructureModule } from './infrastructure/roomtype-infrastructure.module';

@Module({
    imports: [
        CqrsModule,
        RoomtypeInfrastructureModule.register({
            storage_driver: 'orm', // 'orm' | 'in-memory'
        }),
    ],
    controllers: [RoomtypeController],
    providers: [...RoomtypeUseCases],
})
export class RoomtypeModule {}
