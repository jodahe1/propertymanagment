import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { PersistenceEntity } from '@shared/shared-kernel/entities/persistence/persistence.entity';

@Entity({ tableName: 'Expense' })
export class ExpensePersistenceEntity extends PersistenceEntity{
  @PrimaryKey({ type: 'uuid', defaultRaw: 'gen_random_uuid()' })
  id!: string;

  @Property()
  hotelId: string;

  @Property()
  category: string;

  @Property()
  amount: number;

  @Property()
  currency: string;

  @Property({ nullable: true })
  description?: string;

  @Property()
  expenseDate: Date;

  @Property({ nullable: true })
  receiptUrl?: string;
}
