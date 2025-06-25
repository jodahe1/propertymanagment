import { Entity, PrimaryKey, Property, ManyToOne } from '@mikro-orm/core';
import { PersistenceEntity } from '@shared/shared-kernel/entities/persistence/persistence.entity';
import { AvailabilityStatus } from 'src/room/domain/valueObjects';
import { RoomTypePersistenceEntity } from 'src/roomType/infrastructure/adapters/orm/persistence-entities/roomType.persistence.entity';
import { HotelPersistenceEntity } from 'src/hotel/infrastructure/adapters/orm/persistence-entities/hotel.persistence.entity';

@Entity({ tableName: 'Room' })
export class RoomPersistenceEntity extends PersistenceEntity {
  @PrimaryKey({ type: 'uuid', defaultRaw: 'gen_random_uuid()' })
  id!: string;

  @ManyToOne(() => HotelPersistenceEntity, { fieldName: 'hotel_id' })
  hotel!: HotelPersistenceEntity;

  @ManyToOne(() => RoomTypePersistenceEntity, { fieldName: 'room_type_id' })
  roomType!: RoomTypePersistenceEntity;

  @Property()
  room_number!: string;

  @Property({ type: 'number', nullable: true })
  floor_number?: number;

  @Property({ type: 'string' })
  availability_status!: AvailabilityStatus;

  @Property({ type: 'number' })
  current_price!: number;

  @Property({ type: 'text', nullable: true })
  notes?: string;
}
