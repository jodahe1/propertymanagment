import { Entity, PrimaryKey, Property, ManyToOne } from '@mikro-orm/core';
import { PersistenceEntity } from '@shared/shared-kernel/entities/persistence/persistence.entity';
import { BedType } from 'src/roomType/domain/valueObjects';
import { HotelPersistenceEntity } from 'src/hotel/infrastructure/adapters/orm/persistence-entities/hotel.persistence.entity';

@Entity({ tableName: 'RoomType' })
export class RoomTypePersistenceEntity extends PersistenceEntity {
  @PrimaryKey({ type: 'uuid', defaultRaw: 'gen_random_uuid()' })
  id!: string;

  @ManyToOne(() => HotelPersistenceEntity, { fieldName: 'hotel_id' })
  hotel!: HotelPersistenceEntity;

  @Property()
  name!: string;

  @Property({ type: 'text', nullable: true })
  description?: string;

  @Property({ type: 'number' })
  max_guests!: number;

  @Property({ type: 'number' })
  max_adults!: number;

  @Property({ type: 'number' })
  max_children!: number;

  @Property({ type: 'string' })
  bed_type!: BedType;

  @Property({ type: 'json', nullable: true })
  amenities?: string[];

  @Property({ type: 'number' })
  base_price!: number;

  @Property({ type: 'numeric', nullable: true })
  size_sqm?: number;

  @Property({ type: 'number' })
  quantity!: number;

  @Property({ type: 'number', nullable: true })
  extra_bed_capacity?: number;
}
