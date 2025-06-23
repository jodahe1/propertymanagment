import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { PersistenceEntity } from '@shared/shared-kernel/entities/persistence/persistence.entity';

@Entity({ tableName: 'Booking' })
export class BookingPersistenceEntity extends PersistenceEntity{
  @PrimaryKey({ type: 'uuid', defaultRaw: 'gen_random_uuid()' })
  id!: string;

  @Property()
  hotelId: string;

  @Property()
  guestId: string;

  @Property()
  roomId: string;

  @Property()
  checkInDate: Date;

  @Property()
  checkOutDate: Date;

  @Property()
  numGuests: number;

  @Property()
  totalPrice: number;

  @Property()
  currency: string;

  @Property()
  status: string;

  @Property({ nullable: true })
  notes?: string;
}
