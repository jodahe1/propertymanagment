import { Entity, PrimaryKey, Property, ManyToOne } from '@mikro-orm/core';
import { PersistenceEntity } from '@shared/shared-kernel/entities/persistence/persistence.entity';
import {
  GuestGender,
  GuestIdDocumentType,
} from 'src/guest/domain/valueObjects';
import { UserPersistenceEntity } from 'src/user/infrastructure/adapters/orm';
@Entity({ tableName: 'Guest' })
export class GuestPersistenceEntity extends PersistenceEntity {
  @PrimaryKey({ type: 'uuid', defaultRaw: 'gen_random_uuid()' })
  id!: string;

  @Property()
  first_name: string;

  @Property()
  last_name: string;

  @Property()
  email: string;

  @Property()
  phone: string;

  @Property()
  address: string;

  @Property()
  country: string;

  @Property()
  country_num: number;

  @Property()
  city: string;

  @Property()
  postcode: string;

  @Property({ type: 'string' })
  gender: GuestGender;

  @Property({ type: 'string' })
  id_document_type: GuestIdDocumentType;

  @Property()
  id_number: string;

  @Property()
  id_issue_date: Date;

  @Property()
  id_expiry_date: Date;

  @Property()
  nationality: number;

  @Property()
  date_of_birth: Date;

  @Property()
  marketing_opt_in: boolean;

  
  @ManyToOne(() => UserPersistenceEntity) 
  registered_by_user!: UserPersistenceEntity; 

  
  @Property({ persist: false }) 
  registered_by_user_id: string; 

  @Property({ nullable: true })
  address2?: string;

  @Property({ nullable: true })
  state?: string;

  @Property()
  is_organization: boolean;

  @Property({ nullable: true })
  organization_name?: string;
}
