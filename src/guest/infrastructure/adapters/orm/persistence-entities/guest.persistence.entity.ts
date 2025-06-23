import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { PersistenceEntity } from '@shared/shared-kernel/entities/persistence/persistence.entity';

@Entity({ tableName: 'Guest' })
export class GuestPersistenceEntity extends PersistenceEntity{
  @PrimaryKey({ type: 'uuid', defaultRaw: 'gen_random_uuid()' })
  id!: string;

  @Property()
  fullName: string;

  @Property()
  email: string;

  @Property({ nullable: true })
  phoneNumber?: string;

  @Property({ nullable: true })
  address?: string;

  @Property({ nullable: true })
  city?: string;

  @Property({ nullable: true })
  country?: string;

  @Property({ nullable: true })
  zipCode?: string;

  @Property({ nullable: true })
  dateOfBirth?: Date;

  @Property({ nullable: true })
  nationality?: string;

  @Property()
  idDocumentType: string;

  @Property()
  idDocumentNumber: string;

  @Property({ nullable: true })
  notes?: string;
}
