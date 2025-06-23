import { Booking } from 'src/booking/domain/entities';
import { BookingPersistenceEntity } from '../persistence-entities/booking.persistence.entity';
import { EntityManager } from '@mikro-orm/core';

export class BookingPersistenceMapper {
    static toDomain(entity: BookingPersistenceEntity): Booking {
        return new Booking(
            entity.hotelId,
            entity.guestId,
            entity.roomId,
            entity.checkInDate,
            entity.checkOutDate,
            entity.numGuests,
            entity.totalPrice,
            entity.currency,
            entity.status,
            entity.notes,
            entity.id,
        );
    }

    static toEntity(domain: Booking, em: EntityManager): BookingPersistenceEntity {
        const entity = new BookingPersistenceEntity();
        entity.id = domain.id;
        entity.hotelId = domain.hotelId;
        entity.guestId = domain.guestId;
        entity.roomId = domain.roomId;
        entity.checkInDate = domain.checkInDate;
        entity.checkOutDate = domain.checkOutDate;
        entity.numGuests = domain.numGuests;
        entity.totalPrice = domain.totalPrice;
        entity.currency = domain.currency;
        entity.status = domain.status;
        entity.notes = domain.notes;
        return entity;
    }
}
