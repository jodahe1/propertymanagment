import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { PersistenceEntity } from '@shared/shared-kernel/entities/persistence/persistence.entity';

@Entity({ tableName: 'Invoice' })
export class InvoicePersistenceEntity extends PersistenceEntity{
  @PrimaryKey({ type: 'uuid', defaultRaw: 'gen_random_uuid()' })
  id!: string;

  @Property()
  hotelId: string;

  @Property()
  bookingId: string;

  @Property()
  invoiceNumber: string;

  @Property()
  amountDue: number;

  @Property({ nullable: true })
  taxes?: string;

  @Property()
  issuedAt: Date;

  @Property()
  dueDate: Date;

  @Property()
  status: string;
}
