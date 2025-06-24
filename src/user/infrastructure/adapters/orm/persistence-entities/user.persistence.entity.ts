import {
  Entity,
  PrimaryKey,
  Property,
  OneToMany,
  Collection,
} from '@mikro-orm/core'; // Import Collection
import { PersistenceEntity } from '@shared/shared-kernel/entities/persistence/persistence.entity';
import { HotelPersistenceEntity } from 'src/hotel/infrastructure/adapters/orm';
import { UserRole } from 'src/user/domain/valueObjects';

@Entity({ tableName: 'User' })
export class UserPersistenceEntity extends PersistenceEntity {
  @PrimaryKey({ type: 'uuid', defaultRaw: 'gen_random_uuid()' })
  id!: string;

  @Property()
  full_name!: string;

  @Property()
  email!: string;

  @Property({ nullable: true })
  phone_number?: string;

  @Property()
  password!: string;

  @Property({ type: 'string' })
  role!: UserRole;

  @Property({ nullable: true })
  is_verified?: boolean;

  @Property({ nullable: true })
  profile_picture?: string;

  @Property({ nullable: true })
  last_login_at?: Date;

  @Property({ type: 'json', nullable: true })
  permissions?: string;

  @OneToMany(() => HotelPersistenceEntity, (hotel) => hotel.user) // One-to-Many relationship
  hotels = new Collection<HotelPersistenceEntity>(this); // Initialize as a Collection
}
