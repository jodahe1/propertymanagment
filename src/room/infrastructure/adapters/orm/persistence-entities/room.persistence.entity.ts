import { Entity, PrimaryKey, Property, ManyToOne } from '@mikro-orm/core';
import { PersistenceEntity } from '@shared/shared-kernel/entities/persistence/persistence.entity';
import { AvailabilityStatus } from 'src/room/domain/valueObjects';

@Entity({ tableName: 'Room' })
export class RoomPersistenceEntity extends PersistenceEntity {
  @PrimaryKey({ type: 'uuid', defaultRaw: 'gen_random_uuid()' })
  id!: string;

  @ManyToOne('HotelPersistenceEntity', { fieldName: 'hotel_id' })
  hotel!: any;

  @ManyToOne('RoomTypePersistenceEntity', { fieldName: 'room_type_id' })
  roomType!: any;

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
