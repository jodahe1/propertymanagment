import { CqrsModule } from '@nestjs/cqrs';
import { BookingUseCases } from './application/useCases';
import { BookingController } from './presentation/http/booking.controller';
import { Module } from '@nestjs/common';
import { BookingInfrastructureModule } from './infrastructure/booking-infrastructure.module';

@Module({
    imports: [
        CqrsModule,
        BookingInfrastructureModule.register({
            storage_driver: 'orm', // 'orm' | 'in-memory'
        }),
    ],
    controllers: [BookingController],
    providers: [...BookingUseCases],
})
export class BookingModule {}
