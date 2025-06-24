import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { PersistenceEntity } from '@shared/shared-kernel/entities/persistence/persistence.entity';

@Entity({ tableName: 'Staff' })
export class StaffPersistenceEntity extends PersistenceEntity{
  @PrimaryKey({ type: 'uuid', defaultRaw: 'gen_random_uuid()' })
  id!: string;

  @Property()
  hotelId: string;

  @Property()
  userId: string;

  @Property()
  position: string;

  @Property()
  employmentStatus: string;

  @Property()
  hireDate: Date;

  @Property({ nullable: true })
  salary?: number;

  @Property({ nullable: true })
  contactNumber?: string;
}
