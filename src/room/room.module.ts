import { CqrsModule } from '@nestjs/cqrs';
import { RoomUseCases } from './application/useCases';
import { RoomController } from './presentation/http/room.controller';
import { Module } from '@nestjs/common';
import { RoomInfrastructureModule } from './infrastructure/room-infrastructure.module';

@Module({
    imports: [
        CqrsModule,
        RoomInfrastructureModule.register({
            storage_driver: 'orm', // 'orm' | 'in-memory'
        }),
    ],
    controllers: [RoomController],
    providers: [...RoomUseCases],
})
export class RoomModule {}
