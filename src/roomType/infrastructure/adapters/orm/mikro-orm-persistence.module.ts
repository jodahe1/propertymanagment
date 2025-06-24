import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { RoomTypePersistenceEntity } from './persistence-entities/roomType.persistence.entity';
import { TRoomTypeRepository } from 'src/roomType/application/ports/outgoing/roomType.repository';
import { RoomTypeRepository } from './repositories/roomType.repository';


@Module({
  imports: [
    MikroOrmModule.forFeature([RoomTypePersistenceEntity]),
  ],
  providers: [
    {
      provide: TRoomTypeRepository,
      useClass: RoomTypeRepository,
    },
  ],
  exports: [TRoomTypeRepository],
})
export class MikroOrmPersistenceModule {}
