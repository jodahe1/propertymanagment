import { CqrsModule } from '@nestjs/cqrs';
import { RoomTypeUseCases } from './application/useCases';
import { RoomTypeController } from './presentation/http/roomType.controller';
import { Module } from '@nestjs/common';
import { RoomTypeInfrastructureModule } from './infrastructure/roomType-infrastructure.module';

@Module({
    imports: [
        CqrsModule,
        RoomTypeInfrastructureModule.register({
            storage_driver: 'orm', // 'orm' | 'in-memory'
        }),
    ],
    controllers: [RoomTypeController],
    providers: [...RoomTypeUseCases],
})
export class RoomTypeModule {}
