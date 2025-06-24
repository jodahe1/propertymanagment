import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { HotelPersistenceEntity } from './persistence-entities/hotel.persistence.entity';
import { THotelRepository } from 'src/hotel/application/ports/outgoing/hotel.repository';
import { HotelRepository } from './repositories/hotel.repository';


@Module({
  imports: [
    MikroOrmModule.forFeature([HotelPersistenceEntity]),
  ],
  providers: [
    {
      provide: THotelRepository,
      useClass: HotelRepository,
    },
  ],
  exports: [THotelRepository],
})
export class MikroOrmPersistenceModule {}
