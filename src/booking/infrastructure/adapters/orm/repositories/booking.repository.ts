import { EntityManager, EntityRepository } from "@mikro-orm/core";
import { InjectRepository } from "@mikro-orm/nestjs";
import { Injectable } from "@nestjs/common";
import { MikroOrmBaseRepository } from "@shared/shared-kernel";
import { TBookingRepository } from "src/booking/application/ports/outgoing/booking.repository";
import { Booking } from "src/booking/domain/entities";
import { BookingPersistenceMapper } from "../mappers/booking.mapper";
import { BookingPersistenceEntity } from "../persistence-entities/booking.persistence.entity";

@Injectable()
export class BookingRepository extends MikroOrmBaseRepository<Booking> implements TBookingRepository {
    constructor(
        @InjectRepository(BookingPersistenceEntity)
        private readonly repo: EntityRepository<BookingPersistenceEntity>,
        private readonly entityManager: EntityManager,
    ) {
        super(repo, entityManager);
    }

    protected toDomain(entity: BookingPersistenceEntity): Booking {
        return BookingPersistenceMapper.toDomain(entity);
    }
    protected toEntity(domain: Booking): BookingPersistenceEntity {
        return BookingPersistenceMapper.toEntity(domain, this.entityManager);
    }
    protected updateEntity(entity: BookingPersistenceEntity, updates: Booking): void {
        if (updates.hotelId) entity.hotelId = updates.hotelId;
        if (updates.guestId) entity.guestId = updates.guestId;
        if (updates.roomId) entity.roomId = updates.roomId;
        if (updates.checkInDate) entity.checkInDate = updates.checkInDate;
        if (updates.checkOutDate) entity.checkOutDate = updates.checkOutDate;
        if (updates.numGuests) entity.numGuests = updates.numGuests;
        if (updates.totalPrice) entity.totalPrice = updates.totalPrice;
        if (updates.currency) entity.currency = updates.currency;
        if (updates.status) entity.status = updates.status;
        if (updates.notes !== undefined) entity.notes = updates.notes;
    }
}
