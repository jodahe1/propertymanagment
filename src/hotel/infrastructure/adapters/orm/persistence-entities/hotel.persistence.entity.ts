import { Entity, PrimaryKey, Property, ManyToOne } from '@mikro-orm/core'; // Import ManyToOne
import { PersistenceEntity } from '@shared/shared-kernel/entities/persistence/persistence.entity';
import { HotelStatus } from 'src/hotel/domain/valueObjects';
import { UserPersistenceEntity } from 'src/user/infrastructure/adapters/orm';
@Entity({ tableName: 'Hotel' })
export class HotelPersistenceEntity extends PersistenceEntity {
  @PrimaryKey({ type: 'uuid', defaultRaw: 'gen_random_uuid()' })
  id!: string;

  // The foreign key property - MikroORM will manage this, but it's good to keep it explicit for clarity
  @Property({ type: 'uuid' })
  user_id!: string;

  @ManyToOne(() => UserPersistenceEntity, { fieldName: 'user_id' }) // Many-to-One relationship
  user!: UserPersistenceEntity; // This links to the UserPersistenceEntity

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
}
