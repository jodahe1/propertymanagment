import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { RoomtypePersistenceEntity } from './persistence-entities/roomtype.persistence.entity';
import { TRoomtypeRepository } from 'src/roomtype/application/ports/outgoing/roomtype.repository';
import { RoomtypeRepository } from './repositories/roomtype.repository';


@Module({
  imports: [
    MikroOrmModule.forFeature([RoomtypePersistenceEntity]),
  ],
  providers: [
    {
      provide: TRoomtypeRepository,
      useClass: RoomtypeRepository,
    },
  ],
  exports: [TRoomtypeRepository],
})
export class MikroOrmPersistenceModule {}
