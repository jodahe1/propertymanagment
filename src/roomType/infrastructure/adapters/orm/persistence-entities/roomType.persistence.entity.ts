import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { PersistenceEntity } from '@shared/shared-kernel/entities/persistence/persistence.entity';

@Entity({ tableName: 'RoomType' })
export class RoomTypePersistenceEntity extends PersistenceEntity{
  @PrimaryKey({ type: 'uuid', defaultRaw: 'gen_random_uuid()' })
  id!: string;

  @Property()
  hotel_id: string;

  @Property()
  name: string;

  @Property({ nullable: true })
  description?: string;

  @Property()
  max_guests: number;

  @Property()
  max_adults: number;

  @Property()
  max_children: number;

  @Property()
  bed_type: string;

  @Property({ type: 'json', nullable: true })
  amenities?: string[];

  @Property()
  base_price: number;

  @Property({ nullable: true })
  size_sqm?: number;

  @Property()
  quantity: number;

  @Property({ nullable: true })
  extra_bed_capacity?: number;
}
