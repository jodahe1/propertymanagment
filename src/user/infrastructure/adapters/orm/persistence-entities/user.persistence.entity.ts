import {
  Entity,
  PrimaryKey,
  Property,
  OneToMany,
  Collection
} from '@mikro-orm/core';
import { PersistenceEntity } from '@shared/shared-kernel/entities/persistence/persistence.entity';
import { HotelPersistenceEntity } from 'src/hotel/infrastructure/adapters/orm';
@Entity({ tableName: 'User' })
export class UserPersistenceEntity extends PersistenceEntity {
  @PrimaryKey({ type: 'uuid', defaultRaw: 'gen_random_uuid()' })
  id!: string;

  @Property()
  fullName: string;

  @Property()
  email: string;

  @Property({ nullable: true })
  phoneNumber?: string;

  @Property()
  password: string;

  @Property()
  role: string;

  @Property({ nullable: true })
  isVerified?: boolean;

  @Property({ nullable: true })
  profilePicture?: string;

  @Property({ nullable: true })
  lastLoginAt?: Date;
   @OneToMany(() => HotelPersistenceEntity, hotel => hotel.user)
  hotels = new Collection<HotelPersistenceEntity>(this);
}
