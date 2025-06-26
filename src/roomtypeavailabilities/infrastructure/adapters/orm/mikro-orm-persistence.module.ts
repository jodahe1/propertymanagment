import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { RoomtypeavailabilitiesPersistenceEntity } from './persistence-entities/roomtypeavailabilities.persistence.entity';
import { TRoomtypeavailabilitiesRepository } from 'src/roomtypeavailabilities/application/ports/outgoing/roomtypeavailabilities.repository';
import { RoomtypeavailabilitiesRepository } from './repositories/roomtypeavailabilities.repository';


@Module({
  imports: [
    MikroOrmModule.forFeature([RoomtypeavailabilitiesPersistenceEntity]),
  ],
  providers: [
    {
      provide: TRoomtypeavailabilitiesRepository,
      useClass: RoomtypeavailabilitiesRepository,
    },
  ],
  exports: [TRoomtypeavailabilitiesRepository],
})
export class MikroOrmPersistenceModule {}
