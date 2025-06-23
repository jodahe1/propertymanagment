import { EntityManager, EntityRepository } from "@mikro-orm/core";
import { InjectRepository } from "@mikro-orm/nestjs";
import { Injectable } from "@nestjs/common";
import { MikroOrmBaseRepository } from "@shared/shared-kernel";
import { TInvoiceRepository } from "src/invoice/application/ports/outgoing/invoice.repository";
import { Invoice } from "src/invoice/domain/entities";
import { InvoicePersistenceMapper } from "../mappers/invoice.mapper";
import { InvoicePersistenceEntity } from "../persistence-entities/invoice.persistence.entity";

@Injectable()
export class InvoiceRepository extends MikroOrmBaseRepository<Invoice> implements TInvoiceRepository {
    constructor(
        @InjectRepository(InvoicePersistenceEntity)
        private readonly repo: EntityRepository<InvoicePersistenceEntity>,
        private readonly entityManager: EntityManager,
    ) {
        super(repo, entityManager);
    }

    protected toDomain(entity: InvoicePersistenceEntity): Invoice {
        return InvoicePersistenceMapper.toDomain(entity);
    }
    protected toEntity(domain: Invoice): InvoicePersistenceEntity {
        return InvoicePersistenceMapper.toEntity(domain, this.entityManager);
    }
    protected updateEntity(entity: InvoicePersistenceEntity, updates: Invoice): void {
        if (updates.hotelId) entity.hotelId = updates.hotelId;
        if (updates.bookingId) entity.bookingId = updates.bookingId;
        if (updates.invoiceNumber) entity.invoiceNumber = updates.invoiceNumber;
        if (updates.amountDue) entity.amountDue = updates.amountDue;
        if (updates.taxes !== undefined) entity.taxes = updates.taxes;
        if (updates.issuedAt) entity.issuedAt = updates.issuedAt;
        if (updates.dueDate) entity.dueDate = updates.dueDate;
        if (updates.status) entity.status = updates.status;
    }
}
