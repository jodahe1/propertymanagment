import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { PersistenceEntity } from '@shared/shared-kernel/entities/persistence/persistence.entity';

@Entity({ tableName: 'Payment' })
export class PaymentPersistenceEntity extends PersistenceEntity{
  @PrimaryKey({ type: 'uuid', defaultRaw: 'gen_random_uuid()' })
  id!: string;

  @Property()
  bookingId: string;

  @Property()
  amount: number;

  @Property()
  currency: string;

  @Property()
  paymentMethod: string;

  @Property()
  status: string;

  @Property({ nullable: true })
  transactionReference?: string;

  @Property()
  paidAt: Date;
}
