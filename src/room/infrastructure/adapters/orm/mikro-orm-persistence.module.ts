import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { RoomPersistenceEntity } from './persistence-entities/room.persistence.entity';
import { TRoomRepository } from 'src/room/application/ports/outgoing/room.repository';
import { RoomRepository } from './repositories/room.repository';


@Module({
  imports: [
    MikroOrmModule.forFeature([RoomPersistenceEntity]),
  ],
  providers: [
    {
      provide: TRoomRepository,
      useClass: RoomRepository,
    },
  ],
  exports: [TRoomRepository],
})
export class MikroOrmPersistenceModule {}
