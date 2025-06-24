import { CqrsModule } from '@nestjs/cqrs';
import { HotelUseCases } from './application/useCases';
import { HotelController } from './presentation/http/hotel.controller';
import { Module } from '@nestjs/common';
import { HotelInfrastructureModule } from './infrastructure/hotel-infrastructure.module';

@Module({
    imports: [
        CqrsModule,
        HotelInfrastructureModule.register({
            storage_driver: 'orm', // 'orm' | 'in-memory'
        }),
    ],
    controllers: [HotelController],
    providers: [...HotelUseCases],
})
export class HotelModule {}
