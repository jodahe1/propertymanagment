import { Invoice } from 'src/invoice/domain/entities';
import { InvoicePersistenceEntity } from '../persistence-entities/invoice.persistence.entity';
import { EntityManager } from '@mikro-orm/core';

export class InvoicePersistenceMapper {
    static toDomain(entity: InvoicePersistenceEntity): Invoice {
        return new Invoice(
            entity.hotelId,
            entity.bookingId,
            entity.invoiceNumber,
            entity.amountDue,
            entity.taxes,
            entity.issuedAt,
            entity.dueDate,
            entity.status,
            entity.id,
        );
    }

    static toEntity(domain: Invoice, em: EntityManager): InvoicePersistenceEntity {
        const entity = new InvoicePersistenceEntity();
        entity.id = domain.id;
        entity.hotelId = domain.hotelId;
        entity.bookingId = domain.bookingId;
        entity.invoiceNumber = domain.invoiceNumber;
        entity.amountDue = domain.amountDue;
        entity.taxes = domain.taxes;
        entity.issuedAt = domain.issuedAt;
        entity.dueDate = domain.dueDate;
        entity.status = domain.status;
        return entity;
    }
}
