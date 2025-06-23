import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { BookingPersistenceEntity } from './persistence-entities/booking.persistence.entity';
import { TBookingRepository } from 'src/booking/application/ports/outgoing/booking.repository';
import { BookingRepository } from './repositories/booking.repository';


@Module({
  imports: [
    MikroOrmModule.forFeature([BookingPersistenceEntity]),
  ],
  providers: [
    {
      provide: TBookingRepository,
      useClass: BookingRepository,
    },
  ],
  exports: [TBookingRepository],
})
export class MikroOrmPersistenceModule {}
