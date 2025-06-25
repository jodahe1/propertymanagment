import {
  Entity,
  PrimaryKey,
  Property,
  ManyToOne,
  OneToMany,
  Collection,
} from '@mikro-orm/core';
import { PersistenceEntity } from '@shared/shared-kernel/entities/persistence/persistence.entity';
import { HotelStatus } from 'src/hotel/domain/valueObjects';
import { UserPersistenceEntity } from 'src/user/infrastructure/adapters/orm';
import { RoomTypePersistenceEntity } from 'src/roomType/infrastructure/adapters/orm';
import { RoomPersistenceEntity } from 'src/room/infrastructure/adapters/orm/persistence-entities/room.persistence.entity';

@Entity({ tableName: 'Hotel' })
export class HotelPersistenceEntity extends PersistenceEntity {
  @PrimaryKey({ type: 'uuid', defaultRaw: 'gen_random_uuid()' })
  id!: string;

  @ManyToOne(() => UserPersistenceEntity, { fieldName: 'user_id' })
  user!: UserPersistenceEntity;

  @Property()
  name!: string;

  @Property({ type: 'text', nullable: true })
  description?: string;

  @Property()
  address!: string;

  @Property()
  city!: string;

  @Property()
  country!: string;

  @Property({ nullable: true })
  zip_code?: string;

  @Property({ type: 'numeric', nullable: true })
  latitude?: number;

  @Property({ type: 'numeric', nullable: true })
  longitude?: number;

  @Property({ nullable: true })
  contact_email?: string;

  @Property({ nullable: true })
  contact_phone?: string;

  @Property({ nullable: true })
  star_rating?: number;

  @Property({ type: 'string' })
  status!: HotelStatus;

  @Property({ nullable: true })
  timezone?: string;

  @Property({ type: 'json', nullable: true })
  images?: string[];

  @Property({ type: 'json', nullable: true })
  amenities?: string[];

  @Property({ type: 'text', nullable: true })
  check_in_instructions?: string;

  @Property({ nullable: true })
  legal_information?: string;

  @OneToMany(() => RoomTypePersistenceEntity, (roomType) => roomType.hotel)
  roomTypes = new Collection<RoomTypePersistenceEntity>(this);

  @OneToMany(() => RoomPersistenceEntity, (room) => room.hotel)
  rooms = new Collection<RoomPersistenceEntity>(this);
}
